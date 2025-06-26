CREATE SCHEMA IF NOT EXISTS academics;

CREATE TABLE academics.events (
    id integer NOT NULL,
    name text NOT NULL,
    type character varying(30),
    due_date date NOT NULL,
    amount integer DEFAULT 0 NOT NULL
);

ALTER TABLE academics.events ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME academics.events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE academics.events_students (
    id integer NOT NULL,
    student_id integer,
    event_id integer,
    is_paid boolean DEFAULT false,
    payment_amount integer,
    payment_date date,
    payment_receipts jsonb
);

ALTER TABLE academics.events_students ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME academics.events_students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE academics.representatives (
    id integer NOT NULL,
    name text,
    profile_pic text DEFAULT 'default.png'::text NOT NULL,
    student_id integer,
    email character varying(60),
    phone_number character varying(11),
    notify boolean DEFAULT false
);

ALTER TABLE academics.representatives ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME academics.representatives_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE academics.students (
    id integer NOT NULL,
    name text,
    profile_pic text DEFAULT 'default.png'::text,
    notes text DEFAULT ''::text
);

ALTER TABLE academics.students ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME academics.students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


ALTER TABLE ONLY academics.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);

ALTER TABLE ONLY academics.events_students
    ADD CONSTRAINT events_students_pkey PRIMARY KEY (id);

ALTER TABLE ONLY academics.representatives
    ADD CONSTRAINT representatives_pkey PRIMARY KEY (id);

ALTER TABLE ONLY academics.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);

ALTER TABLE ONLY academics.events_students
    ADD CONSTRAINT unique_student_event UNIQUE (student_id, event_id);

ALTER TABLE ONLY academics.events_students
    ADD CONSTRAINT fk_events FOREIGN KEY (event_id) REFERENCES academics.events(id);

ALTER TABLE ONLY academics.events_students
    ADD CONSTRAINT fk_students FOREIGN KEY (student_id) REFERENCES academics.students(id);

ALTER TABLE ONLY academics.representatives
    ADD CONSTRAINT representatives_student_id_fkey FOREIGN KEY (student_id) REFERENCES academics.students(id);

CREATE OR REPLACE FUNCTION academics.getCuotasCurso()
  RETURNS TABLE (student_name text, parent_name text, parent_email text, paid_fees jsonb, due_fees jsonb)
  LANGUAGE plpgsql AS
$func$
BEGIN
   RETURN QUERY 
   WITH notified_students AS (
      SELECT 
         s.id AS student_id,
         s.name AS student_name,
         r.name AS parent_name,
         r.email AS parent_email
      FROM 
         academics.students s
      JOIN 
         academics.representatives r ON s.id = r.student_id
      WHERE 
         r.notify = true
   ),
   paid_fees AS (
      SELECT
         es.student_id,
         jsonb_build_object(
            'description', e.name,
            'amount', es.payment_amount,
            'date', to_char(es.payment_date, 'MM-DD-YYYY')
         ) AS paid_fee
      FROM 
         academics.events_students es
      JOIN 
         academics.events e ON es.event_id = e.id
      WHERE 
         es.is_paid = true
      AND
         e.type = 'CUOTA CURSO'
   ),
   due_fees AS (
      SELECT
         es.student_id,
         jsonb_build_object(
            'description', e.name,
            'amount', e.amount,
            'dueDate', to_char(e.due_date, 'MM-DD-YYYY'),
            'isLate', (e.due_date < CURRENT_DATE)
         ) AS due_fee
      FROM 
         academics.events_students es
      JOIN 
         academics.events e ON es.event_id = e.id
      WHERE 
         es.is_paid = false
      AND
         e.type = 'CUOTA CURSO'
   )
   SELECT 
   ns.student_name AS "studentName",
   ns.parent_name AS "parentName",
   ns.parent_email::text,
   COALESCE(jsonb_agg(DISTINCT pf.paid_fee) FILTER (WHERE pf.paid_fee IS NOT NULL), '[]') AS "paidFees",
   COALESCE(jsonb_agg(DISTINCT df.due_fee) FILTER (WHERE df.due_fee IS NOT NULL), '[]') AS "dueFees"
   FROM 
      notified_students ns
   LEFT JOIN 
      paid_fees pf ON ns.student_id = pf.student_id
   LEFT JOIN 
      due_fees df ON ns.student_id = df.student_id
   GROUP BY 
      ns.student_name, ns.parent_name, ns.parent_email;
END
$func$;
