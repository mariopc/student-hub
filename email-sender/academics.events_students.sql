--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Debian 16.8-1.pgdg120+1)
-- Dumped by pg_dump version 16.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: events_students; Type: TABLE; Schema: academics; Owner: amancay
--

CREATE TABLE academics.events_students (
    id integer NOT NULL,
    student_id integer,
    event_id integer,
    is_paid boolean DEFAULT false,
    payment_amount integer,
    payment_date date,
    payment_receipts jsonb
);


ALTER TABLE academics.events_students OWNER TO amancay;

--
-- Name: events_students_id_seq; Type: SEQUENCE; Schema: academics; Owner: amancay
--

ALTER TABLE academics.events_students ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME academics.events_students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: events_students; Type: TABLE DATA; Schema: academics; Owner: amancay
--

COPY academics.events_students (id, student_id, event_id, is_paid, payment_amount, payment_date, payment_receipts) FROM stdin;
58	4	7	f	0	\N	{}
62	8	7	f	0	\N	{}
63	9	7	f	0	\N	{}
64	10	7	f	0	\N	{}
68	14	7	f	0	\N	{}
69	15	7	f	0	\N	{}
71	17	7	f	0	\N	{}
74	20	7	f	0	\N	{}
75	21	7	f	0	\N	{}
76	22	7	f	0	\N	{}
77	23	7	f	0	\N	{}
78	24	7	f	0	\N	{}
79	25	7	f	0	\N	{}
81	26	7	f	0	\N	{}
84	4	8	f	0	\N	{}
88	8	8	f	0	\N	{}
89	9	8	f	0	\N	{}
90	10	8	f	0	\N	{}
94	14	8	f	0	\N	{}
95	15	8	f	0	\N	{}
97	17	8	f	0	\N	{}
100	20	8	f	0	\N	{}
101	21	8	f	0	\N	{}
102	22	8	f	0	\N	{}
103	23	8	f	0	\N	{}
104	24	8	f	0	\N	{}
105	25	8	f	0	\N	{}
107	26	8	f	0	\N	{}
109	1	9	f	0	\N	{}
110	4	9	f	0	\N	{}
112	6	9	f	0	\N	{}
114	8	9	f	0	\N	{}
115	9	9	f	0	\N	{}
116	10	9	f	0	\N	{}
120	14	9	f	0	\N	{}
121	15	9	f	0	\N	{}
123	17	9	f	0	\N	{}
124	18	9	f	0	\N	{}
126	20	9	f	0	\N	{}
127	21	9	f	0	\N	{}
128	22	9	f	0	\N	{}
129	23	9	f	0	\N	{}
130	24	9	f	0	\N	{}
131	25	9	f	0	\N	{}
133	26	9	f	0	\N	{}
135	1	10	f	0	\N	{}
136	4	10	f	0	\N	{}
137	5	10	f	0	\N	{}
138	6	10	f	0	\N	{}
140	8	10	f	0	\N	{}
141	9	10	f	0	\N	{}
142	10	10	f	0	\N	{}
143	11	10	f	0	\N	{}
145	13	10	f	0	\N	{}
146	14	10	f	0	\N	{}
147	15	10	f	0	\N	{}
149	17	10	f	0	\N	{}
150	18	10	f	0	\N	{}
152	20	10	f	0	\N	{}
153	21	10	f	0	\N	{}
154	22	10	f	0	\N	{}
155	23	10	f	0	\N	{}
156	24	10	f	0	\N	{}
157	25	10	f	0	\N	{}
158	3	10	f	0	\N	{}
159	26	10	f	0	\N	{}
160	27	10	f	0	\N	{}
161	1	11	f	0	\N	{}
162	4	11	f	0	\N	{}
163	5	11	f	0	\N	{}
164	6	11	f	0	\N	{}
165	7	11	f	0	\N	{}
166	8	11	f	0	\N	{}
167	9	11	f	0	\N	{}
168	10	11	f	0	\N	{}
169	11	11	f	0	\N	{}
171	13	11	f	0	\N	{}
172	14	11	f	0	\N	{}
173	15	11	f	0	\N	{}
174	16	11	f	0	\N	{}
175	17	11	f	0	\N	{}
176	18	11	f	0	\N	{}
177	19	11	f	0	\N	{}
178	20	11	f	0	\N	{}
179	21	11	f	0	\N	{}
180	22	11	f	0	\N	{}
181	23	11	f	0	\N	{}
182	24	11	f	0	\N	{}
183	25	11	f	0	\N	{}
184	3	11	f	0	\N	{}
185	26	11	f	0	\N	{}
186	27	11	f	0	\N	{}
91	11	8	t	5000	2025-04-01	["PaymentReceipt_b05e7261ab9e4283b1ce1c0b2f0954b5_8_11_2025-04-01T03:00:00.000Z.png"]
188	4	18	t	1500	2025-04-02	["PaymentReceipt_d287580c609b45f18054316a96d1501c_18_4_2025-04-02T03:00:00.000Z.png"]
60	6	7	t	5000	2025-04-02	["PaymentReceipt_5b419c7f877c4283b6e07b41df0c280c_7_6_2025-04-02T03:00:00.000Z.png"]
192	8	18	t	1500	2025-04-05	["PaymentReceipt_0a911e1007ac496e85dc570638b1bc33_18_8_2025-04-05T03:00:00.000Z.png"]
70	16	7	t	5000	2025-03-17	["PaymentReceipt_e72ab0fbee36481e8b9a7861dca29d1f_7_16_2025-03-17T03:00:00.000Z.png"]
113	7	9	t	5000	2025-03-17	["PaymentReceipt_09da813c67354b5ba7d03f8a1a898617_9_7_2025-03-17T03:00:00.000Z.png"]
59	5	7	t	5000	2025-04-01	["PaymentReceipt_1dc1be18d25643578798bd4e73abfb38_7_5_2025-04-01T03:00:00.000Z.png"]
239	1	13	f	0	\N	{}
187	1	18	t	1500	2025-04-01	{}
191	7	18	t	1500	2025-04-01	["PaymentReceipt_2a843f04678e475a887290f602c06122_18_7_2025-04-01T03:00:00.000Z.png"]
108	27	8	t	5000	2025-05-07	["PaymentReceipt_70df4e5a46e546f88c08820ac304f0e2_8_27_2025-05-07T04:00:00.000Z.png"]
96	16	8	t	5000	2025-05-08	["PaymentReceipt_99847f1d2b72465391599cf90b086071_8_16_2025-05-08T04:00:00.000Z.png"]
170	12	11	t	5000	2025-05-14	["PaymentReceipt_e3f5481d3f374d009e4dea6ba6899696_11_12_2025-05-14T04:00:00.000Z.png"]
80	3	7	t	5000	2025-05-17	["PaymentReceipt_4fc6d543ec2e43ff9a6513fac1b82ebf_7_3_2025-05-17T04:00:00.000Z.png"]
132	3	9	t	5000	2025-05-17	["PaymentReceipt_a446e74b046340afa8aff511dd501748_9_3_2025-05-17T04:00:00.000Z.png"]
148	16	10	t	5000	2025-05-17	["PaymentReceipt_1046b49ab7304da8bdf8dff8a6c191e4_10_16_2025-05-17T04:00:00.000Z.png"]
151	19	10	t	5000	2025-05-17	["PaymentReceipt_3e7428306e15461db730425fa9f6b670_10_19_2025-05-17T04:00:00.000Z.png"]
98	18	8	t	5000	2025-05-19	["PaymentReceipt_4c22946141574344ac3ae97017bfeaf1_8_18_2025-05-19T04:00:00.000Z.png"]
207	23	18	t	1500	2025-04-01	["PaymentReceipt_c19029c10fe2462eaa2bfb47e4eefe45_18_23_2025-04-01T03:00:00.000Z.png"]
195	11	18	t	1500	2025-04-01	["PaymentReceipt_869723eacf5a4bc589daea34f7670aae_18_11_2025-04-01T03:00:00.000Z.png"]
65	11	7	t	5000	2025-04-01	["PaymentReceipt_f51867ffe9e04f32b6ee6264bdc1522f_7_11_2025-04-01T03:00:00.000Z.png"]
196	12	18	t	1500	2025-04-01	["PaymentReceipt_307946a5c6184af19683cb64a2a05a61_18_12_2025-04-01T03:00:00.000Z.png"]
66	12	7	t	5000	2025-04-01	["PaymentReceipt_3f4e4dbdd0bd47c3974fef42b9f72fc0_7_12_2025-04-01T03:00:00.000Z.png"]
92	12	8	t	5000	2025-04-01	["PaymentReceipt_04ff9881ee3a4b26b8db9e648c946229_8_12_2025-04-01T03:00:00.000Z.png"]
190	6	18	t	1500	2025-04-02	["PaymentReceipt_9bc49b205cd246709732259e4b268bd4_18_6_2025-04-02T03:00:00.000Z.png"]
204	20	18	t	1500	2025-04-02	["PaymentReceipt_5aa9a608be40457598224da7b492c7a2_18_20_2025-04-02T03:00:00.000Z.png"]
199	15	18	t	1500	2025-04-02	["PaymentReceipt_0564b75969794a2c9eee9fc0cb3cce9b_18_15_2025-04-02T03:00:00.000Z.png"]
194	10	18	t	1500	2025-04-02	["PaymentReceipt_25114771843e465781d32ddbbc0a0cbc_18_10_2025-04-02T03:00:00.000Z.png"]
203	19	18	t	1500	2025-04-02	["PaymentReceipt_9a2e7f0ca2fa43b7ae9b6b0e88491cc9_18_19_2025-04-02T03:00:00.000Z.png"]
73	19	7	t	5000	2025-04-02	["PaymentReceipt_57f4ed64b9ae40fb91e9c4000c510113_7_19_2025-04-02T03:00:00.000Z.png"]
99	19	8	t	5000	2025-04-02	["PaymentReceipt_a86b34a5567946839871a62e4e39c883_8_19_2025-04-02T03:00:00.000Z.png"]
193	9	18	t	1500	2025-04-02	["PaymentReceipt_30cc69c64ff3459f95b8ab9915b446aa_18_9_2025-04-02T03:00:00.000Z.png"]
209	25	18	t	1500	2025-04-03	["PaymentReceipt_d65462724cdd48cf94bbf37d944328a0_18_25_2025-04-03T03:00:00.000Z.png"]
206	22	18	t	1500	2025-04-03	["PaymentReceipt_559abce669ce4bf099e6fbb4f0707194_18_22_2025-04-03T03:00:00.000Z.png"]
197	13	18	t	1500	2025-04-04	["PaymentReceipt_6b4425ef63d24b86bee7698aad24929a_18_13_2025-04-04T03:00:00.000Z.png"]
201	17	18	t	1500	2025-04-08	["PaymentReceipt_e850ba8fdea14039880bc1472266d425_18_17_2025-04-08T04:00:00.000Z.png"]
205	21	18	t	1500	2025-04-08	["PaymentReceipt_e5c29115cf2445c6b169135ee478722f_18_21_2025-04-08T04:00:00.000Z.png"]
208	24	18	t	1500	2025-04-08	["PaymentReceipt_5827bd1dc3c44490af4aabc935261580_18_24_2025-04-08T04:00:00.000Z.png"]
210	3	18	t	1500	2025-04-03	["PaymentReceipt_8f27e456f25442b4a56fe2eaf9027cab_18_3_2025-04-03T03:00:00.000Z.png"]
198	14	18	t	1500	2025-04-03	["PaymentReceipt_f21d7685ae35498cb98f845fb9f51b5f_18_14_2025-04-03T03:00:00.000Z.png"]
67	13	7	t	5000	2025-04-02	["PaymentReceipt_af7db1c342b547a89e5231fd01ecd293_7_13_2025-04-02T03:00:00.000Z.png"]
93	13	8	t	5000	2025-04-02	["PaymentReceipt_3d2b0ce456704007a9e9f67b7cece98e_8_13_2025-04-02T03:00:00.000Z.png"]
83	1	8	t	5000	2025-04-11	["PaymentReceipt_92c25ad642754ad2bc1a02471d26d62f_8_1_2025-04-11T04:00:00.000Z.png"]
61	7	7	t	5000	2025-03-17	["PaymentReceipt_6cb5a56de84e44539f15a5b698cf99ed_7_7_2025-03-17T03:00:00.000Z.png"]
87	7	8	t	5000	2025-03-17	["PaymentReceipt_4767dd339a55418b91c983501916a007_8_7_2025-03-17T03:00:00.000Z.png"]
139	7	10	t	5000	2025-03-17	["PaymentReceipt_96ae016592364c469da2f78ac726d831_10_7_2025-03-17T03:00:00.000Z.png"]
189	5	18	t	1500	2025-04-01	["PaymentReceipt_db3ef678da7c4283829211528abb5b1d_18_5_2025-04-01T03:00:00.000Z.png"]
213	1	12	f	0	\N	{}
214	4	12	f	0	\N	{}
215	5	12	f	0	\N	{}
216	6	12	f	0	\N	{}
217	7	12	f	0	\N	{}
218	8	12	f	0	\N	{}
219	9	12	f	0	\N	{}
220	10	12	f	0	\N	{}
221	11	12	f	0	\N	{}
223	13	12	f	0	\N	{}
224	14	12	f	0	\N	{}
225	15	12	f	0	\N	{}
226	16	12	f	0	\N	{}
227	17	12	f	0	\N	{}
228	18	12	f	0	\N	{}
229	19	12	f	0	\N	{}
230	20	12	f	0	\N	{}
231	21	12	f	0	\N	{}
232	22	12	f	0	\N	{}
233	23	12	f	0	\N	{}
234	24	12	f	0	\N	{}
235	25	12	f	0	\N	{}
236	3	12	f	0	\N	{}
237	26	12	f	0	\N	{}
238	27	12	f	0	\N	{}
240	4	13	f	0	\N	{}
241	5	13	f	0	\N	{}
242	6	13	f	0	\N	{}
243	7	13	f	0	\N	{}
244	8	13	f	0	\N	{}
245	9	13	f	0	\N	{}
246	10	13	f	0	\N	{}
247	11	13	f	0	\N	{}
248	12	13	f	0	\N	{}
249	13	13	f	0	\N	{}
250	14	13	f	0	\N	{}
251	15	13	f	0	\N	{}
252	16	13	f	0	\N	{}
253	17	13	f	0	\N	{}
254	18	13	f	0	\N	{}
255	19	13	f	0	\N	{}
256	20	13	f	0	\N	{}
257	21	13	f	0	\N	{}
258	22	13	f	0	\N	{}
259	23	13	f	0	\N	{}
260	24	13	f	0	\N	{}
261	25	13	f	0	\N	{}
262	3	13	f	0	\N	{}
263	26	13	f	0	\N	{}
264	27	13	f	0	\N	{}
265	1	14	f	0	\N	{}
266	4	14	f	0	\N	{}
267	5	14	f	0	\N	{}
268	6	14	f	0	\N	{}
212	27	18	t	1500	2025-04-25	["PaymentReceipt_6c9353d6d31f43a481ccf50c94b54bfa_18_27_2025-04-25T04:00:00.000Z.png"]
269	7	14	f	0	\N	{}
270	8	14	f	0	\N	{}
271	9	14	f	0	\N	{}
272	10	14	f	0	\N	{}
273	11	14	f	0	\N	{}
274	12	14	f	0	\N	{}
275	13	14	f	0	\N	{}
276	14	14	f	0	\N	{}
277	15	14	f	0	\N	{}
278	16	14	f	0	\N	{}
279	17	14	f	0	\N	{}
280	18	14	f	0	\N	{}
281	19	14	f	0	\N	{}
282	20	14	f	0	\N	{}
283	21	14	f	0	\N	{}
284	22	14	f	0	\N	{}
285	23	14	f	0	\N	{}
286	24	14	f	0	\N	{}
287	25	14	f	0	\N	{}
288	3	14	f	0	\N	{}
289	26	14	f	0	\N	{}
290	27	14	f	0	\N	{}
291	1	15	f	0	\N	{}
292	4	15	f	0	\N	{}
293	5	15	f	0	\N	{}
294	6	15	f	0	\N	{}
295	7	15	f	0	\N	{}
296	8	15	f	0	\N	{}
297	9	15	f	0	\N	{}
298	10	15	f	0	\N	{}
299	11	15	f	0	\N	{}
300	12	15	f	0	\N	{}
301	13	15	f	0	\N	{}
302	14	15	f	0	\N	{}
303	15	15	f	0	\N	{}
304	16	15	f	0	\N	{}
305	17	15	f	0	\N	{}
306	18	15	f	0	\N	{}
307	19	15	f	0	\N	{}
308	20	15	f	0	\N	{}
309	21	15	f	0	\N	{}
310	22	15	f	0	\N	{}
311	23	15	f	0	\N	{}
312	24	15	f	0	\N	{}
313	25	15	f	0	\N	{}
314	3	15	f	0	\N	{}
315	26	15	f	0	\N	{}
316	27	15	f	0	\N	{}
317	1	16	f	0	\N	{}
318	4	16	f	0	\N	{}
319	5	16	f	0	\N	{}
320	6	16	f	0	\N	{}
321	7	16	f	0	\N	{}
322	8	16	f	0	\N	{}
323	9	16	f	0	\N	{}
324	10	16	f	0	\N	{}
325	11	16	f	0	\N	{}
326	12	16	f	0	\N	{}
327	13	16	f	0	\N	{}
328	14	16	f	0	\N	{}
329	15	16	f	0	\N	{}
330	16	16	f	0	\N	{}
331	17	16	f	0	\N	{}
332	18	16	f	0	\N	{}
333	19	16	f	0	\N	{}
334	20	16	f	0	\N	{}
335	21	16	f	0	\N	{}
336	22	16	f	0	\N	{}
337	23	16	f	0	\N	{}
338	24	16	f	0	\N	{}
339	25	16	f	0	\N	{}
340	3	16	f	0	\N	{}
341	26	16	f	0	\N	{}
342	27	16	f	0	\N	{}
354	14	17	f	0	\N	{}
357	17	17	f	0	\N	{}
364	24	17	f	0	\N	{}
368	27	17	f	0	\N	{}
343	1	17	t	2000	2025-03-14	{}
344	4	17	t	2000	2025-03-14	{}
345	5	17	t	2000	2025-03-14	{}
346	6	17	t	2000	2025-03-14	{}
347	7	17	t	2000	2025-03-14	{}
348	8	17	t	2000	2025-03-14	{}
349	9	17	t	2000	2025-03-14	{}
350	10	17	t	2000	2025-03-14	{}
351	11	17	t	2000	2025-03-14	{}
352	12	17	t	2000	2025-03-14	{}
353	13	17	t	2000	2025-03-14	{}
355	15	17	t	2000	2025-03-14	{}
356	16	17	t	2000	2025-03-14	{}
358	18	17	t	2000	2025-03-14	{}
359	19	17	t	2000	2025-03-14	{}
360	20	17	t	2000	2025-03-14	{}
361	21	17	t	2000	2025-03-14	{}
362	22	17	t	2000	2025-03-14	{}
363	23	17	t	2000	2025-03-14	{}
365	25	17	t	2000	2025-03-14	{}
366	3	17	t	2000	2025-03-14	{}
367	26	17	t	2000	2025-03-14	{}
57	1	7	t	5000	2025-04-11	["PaymentReceipt_2982136d363b4f2db3c98b6882d8eb6a_7_1_2025-04-11T04:00:00.000Z.png", "PaymentReceipt_1dc1be18d25643578798bd4e73abfb38_7_5_2025-04-01T03:00:00.000Z.png"]
211	26	18	t	1500	2025-04-15	["PaymentReceipt_8c789f0bfe4f4b8f95c7099ac36f9acc_18_26_2025-04-15T04:00:00.000Z.png"]
202	18	18	t	1500	2025-04-15	["PaymentReceipt_a66c96a5a4ec43f484733564d13ea6bd_18_18_2025-04-15T04:00:00.000Z.png"]
200	16	18	t	1500	2025-04-15	["PaymentReceipt_3ab3274a86af42178ff00e4ed2a0a21a_18_16_2025-04-15T04:00:00.000Z.png"]
373	7	19	f	0	\N	{}
388	22	19	f	0	\N	{}
390	24	19	t	1000	2025-04-25	["PaymentReceipt_121982d009c34ec09621d172bac6a54d_19_24_2025-04-25T04:00:00.000Z.png"]
381	15	19	t	1000	2025-04-26	["PaymentReceipt_290dd7c92e9d4f609f743c21d6d995fe_19_15_2025-04-26T04:00:00.000Z.png"]
385	19	19	t	1000	2025-04-26	["PaymentReceipt_9b051dd0d6ec40b29bad87cd94ffebf5_19_19_2025-04-26T04:00:00.000Z.png"]
369	1	19	t	1000	2025-04-27	{}
387	21	19	t	1000	2025-04-28	["PaymentReceipt_ed581d84586949129f426c37dec69c5f_19_21_2025-04-28T04:00:00.000Z.png"]
384	18	19	t	1000	2025-04-28	["PaymentReceipt_618038fdf8394d36b27b8e47edb0bb23_19_18_2025-04-28T04:00:00.000Z.png"]
382	16	19	t	1000	2025-04-28	{}
378	12	19	t	1000	2025-04-26	["PaymentReceipt_de4cf16c9431469cbc656d2f9019bd29_19_12_2025-04-26T04:00:00.000Z.png"]
372	6	19	t	1000	2025-04-29	{}
392	26	19	f	0	\N	{}
389	23	19	t	1000	2025-04-25	["PaymentReceipt_f2894df6b77b4875be67a14fde2ddf4c_19_23_2025-04-25T04:00:00.000Z.png"]
386	20	19	t	1000	2025-04-25	["PaymentReceipt_6144195a49d043f38c4353251f505cd6_19_20_2025-04-25T04:00:00.000Z.png"]
377	11	19	t	1000	2025-04-25	["PaymentReceipt_e08e63cde5504780b883c67492785c14_19_11_2025-04-25T04:00:00.000Z.png"]
371	5	19	t	1000	2025-04-25	["PaymentReceipt_206974da210e422fb617731aa7561d5e_19_5_2025-04-25T04:00:00.000Z.png"]
379	13	19	t	1000	2025-04-26	["PaymentReceipt_0ca8458e2f5547809809b8385018254b_19_13_2025-04-26T04:00:00.000Z.png"]
376	10	19	t	1000	2025-04-26	["PaymentReceipt_e2dd93bd796c415b9475fd71bb014e1d_19_10_2025-04-26T04:00:00.000Z.png"]
375	9	19	t	1000	2025-04-27	["PaymentReceipt_b82db7b259bf4c8f8290064c02cf6f34_19_9_2025-04-27T04:00:00.000Z.png"]
391	25	19	t	1000	2025-04-27	["PaymentReceipt_641c645f522b4c2b9c44390da56bc103_19_25_2025-04-27T04:00:00.000Z.png"]
374	8	19	t	1000	2025-04-26	["PaymentReceipt_06c68acd76964daeb66dabda41f9b757_19_8_2025-04-26T04:00:00.000Z.png"]
380	14	19	t	1000	2025-04-28	["PaymentReceipt_ceb7c77803f245bb85219e742e58b2eb_19_14_2025-04-28T04:00:00.000Z.png"]
383	17	19	t	1000	2025-04-28	["PaymentReceipt_84edd5ddd94649f5b86f583914fd8b1e_19_17_2025-04-28T04:00:00.000Z.png"]
393	27	19	t	1000	2025-04-28	["PaymentReceipt_fe63917a40964d9aaec4bd5663527624_19_27_2025-04-28T04:00:00.000Z.png"]
370	4	19	t	1000	2025-04-27	["PaymentReceipt_f731f923ef954c1d858366fa02669e2c_19_4_2025-04-27T04:00:00.000Z.png"]
119	13	9	t	5000	2025-04-30	["PaymentReceipt_9a79379db62a4107bb9de790a2add96f_9_13_2025-04-30T04:00:00.000Z.png"]
82	27	7	t	5000	2025-05-07	["PaymentReceipt_d50716e4992f4792982fb79da3d4f6e8_7_27_2025-05-07T04:00:00.000Z.png"]
134	27	9	t	5000	2025-05-07	["PaymentReceipt_800a3663696c4d219b16162ff8a1ac2a_9_27_2025-05-07T04:00:00.000Z.png"]
407	18	20	f	0	\N	{}
408	19	20	f	0	\N	{}
413	24	20	f	0	\N	{}
394	1	20	t	2000	2025-05-08	{}
417	27	20	t	2000	2025-05-07	["PaymentReceipt_b2ba53d7907c48ee8b76129b14e14a68_20_27_2025-05-07T04:00:00.000Z.png"]
399	8	20	t	2000	2025-05-07	["PaymentReceipt_587a54392da643c7a6f6ecd08b06fee1_20_8_2025-05-07T04:00:00.000Z.png"]
412	23	20	t	2000	2025-05-07	["PaymentReceipt_5654387986ff4124b6e1e027ee2850fe_20_23_2025-05-07T04:00:00.000Z.png"]
398	7	20	t	2000	2025-05-07	["PaymentReceipt_e6edd65737c84bc8ace4083c371303aa_20_7_2025-05-07T04:00:00.000Z.png"]
409	20	20	t	2000	2025-05-07	["PaymentReceipt_1f610c58d2d0418fb8a126d97bbd9a10_20_20_2025-05-07T04:00:00.000Z.png"]
402	11	20	t	2000	2025-05-07	["PaymentReceipt_767cf97984c64f698d5909b4f00395ac_20_11_2025-05-07T04:00:00.000Z.png"]
403	12	20	t	2000	2025-05-07	["PaymentReceipt_4d14090ad59b455d817a33a32da4aa85_20_12_2025-05-07T04:00:00.000Z.png"]
410	21	20	t	2000	2025-05-08	["PaymentReceipt_1a3cf07ddcdf4c7aae37b1e18c379bae_20_21_2025-05-08T04:00:00.000Z.png"]
405	15	20	t	2000	2025-05-08	["PaymentReceipt_d72c0103f661416b9c2485eecc9962b5_20_15_2025-05-08T04:00:00.000Z.png"]
404	13	20	t	2000	2025-05-08	["PaymentReceipt_1dc7dd1ecc6a4573bd1245b7cc136f05_20_13_2025-05-08T04:00:00.000Z.png"]
397	6	20	t	2000	2025-05-08	["PaymentReceipt_ec6f5d82e43b49e78a5a14159c5c9a71_20_6_2025-05-08T04:00:00.000Z.png"]
395	4	20	t	2000	2025-05-08	["PaymentReceipt_e653f0f8d41647caa366712c0b245ed1_20_4_2025-05-08T04:00:00.000Z.png"]
400	9	20	t	2000	2025-05-08	["PaymentReceipt_9ebcbd4e5fb64c5186a488467dac46d0_20_9_2025-05-08T04:00:00.000Z.png"]
414	25	20	t	2000	2025-05-08	["PaymentReceipt_c98d5da67cf14985bf46dc5065539ce9_20_25_2025-05-08T04:00:00.000Z.png"]
406	16	20	t	2000	2025-05-08	["PaymentReceipt_0c36ff169ef4491592b96947fda2f212_20_16_2025-05-08T04:00:00.000Z.png"]
396	5	20	t	2000	2025-05-08	["PaymentReceipt_3e31477ed4a14091bad15c6cab4de5f9_20_5_2025-05-08T04:00:00.000Z.png"]
401	10	20	t	2000	2025-05-08	["PaymentReceipt_c597e932cdd94740977ede6fdc1a14f1_20_10_2025-05-08T04:00:00.000Z.png"]
415	3	20	t	2000	2025-05-12	["PaymentReceipt_62426cb4111f49a0bf3ab1ce08658cc9_20_3_2025-05-12T04:00:00.000Z.png"]
416	26	20	t	2000	2025-05-09	{}
411	22	20	t	2000	2025-05-08	["PaymentReceipt_52f159aa3b56431bb3887df312c6555e_20_22_2025-05-08T04:00:00.000Z.png"]
118	12	9	t	5000	2025-05-14	["PaymentReceipt_254c9e1e08cf432f8df0830a05f7bf17_9_12_2025-05-14T04:00:00.000Z.png"]
144	12	10	t	5000	2025-05-14	["PaymentReceipt_f6298e9a5c5b41daadaf14159673222d_10_12_2025-05-14T04:00:00.000Z.png"]
222	12	12	t	5000	2025-05-14	["PaymentReceipt_ba4ae8020172469787fa849d70df0f72_12_12_2025-05-14T04:00:00.000Z.png"]
85	5	8	t	5000	2025-05-16	["PaymentReceipt_ce6a196e01e7487c90c03e2285cb193d_8_5_2025-05-16T04:00:00.000Z.png"]
111	5	9	t	5000	2025-05-16	["PaymentReceipt_c9014c0756724d74bfc5b6e2ec58bad6_9_5_2025-05-16T04:00:00.000Z.png"]
106	3	8	t	5000	2025-05-17	["PaymentReceipt_98d2c6f601464fcfa4556c122b615af3_8_3_2025-05-17T04:00:00.000Z.png"]
117	11	9	t	5000	2025-05-17	["PaymentReceipt_8c15c7def4674d5db42c41a4adf255e3_9_11_2025-05-17T04:00:00.000Z.png"]
122	16	9	t	5000	2025-05-17	["PaymentReceipt_b04cde7a0def415699ddf1f4de3a9baf_9_16_2025-05-17T04:00:00.000Z.png"]
125	19	9	t	5000	2025-05-17	["PaymentReceipt_fccf186c753f41348ba127b6cdbde30a_9_19_2025-05-17T04:00:00.000Z.png"]
422	7	21	t	1600	2025-05-17	["PaymentReceipt_4d8ed901fdda42d7a94b826287778a89_21_7_2025-05-17T04:00:00.000Z.png"]
420	5	21	t	1600	2025-05-17	["PaymentReceipt_90f45649055749e9abee6db17cd3ebd2_21_5_2025-05-17T04:00:00.000Z.png"]
440	3	21	t	1600	2025-05-17	["PaymentReceipt_54518549200d4f53995895abef54d116_21_3_2025-05-17T04:00:00.000Z.png"]
425	10	21	t	1600	2025-05-17	["PaymentReceipt_acf0ce01884241fdb3e6b66c3be3650b_21_10_2025-05-17T04:00:00.000Z.png"]
435	20	21	t	1600	2025-05-17	["PaymentReceipt_ef45451795f04b219b93fbd980c38e1c_21_20_2025-05-17T04:00:00.000Z.png"]
428	13	21	t	1600	2025-05-18	["PaymentReceipt_a45e024bb3014dea944744bd18b08d3b_21_13_2025-05-18T04:00:00.000Z.png"]
432	17	21	t	1600	2025-05-18	["PaymentReceipt_6b847c531f4641b199f723d90c284bc0_21_17_2025-05-18T04:00:00.000Z.png"]
437	23	21	t	1600	2025-05-18	["PaymentReceipt_c6cd204e16624eb3b01c6f6e92b32753_21_23_2025-05-18T04:00:00.000Z.png"]
418	1	21	t	1600	2025-05-19	{}
424	9	21	t	1600	2025-05-18	["PaymentReceipt_f48b731ba48146cd9d82c0ec896a68a6_21_9_2025-05-18T04:00:00.000Z.png"]
442	27	21	t	1600	2025-05-19	["PaymentReceipt_7de4db361d8543e7b0067b61283a54a6_21_27_2025-05-19T04:00:00.000Z.png"]
441	26	21	t	1600	2025-05-21	["PaymentReceipt_ad5e33042bc4414aacb8b7d36c5ad1ee_21_26_2025-05-21T04:00:00.000Z.png"]
423	8	21	t	1600	2025-05-17	["PaymentReceipt_a715a76747414f2d9f31194b303fa762_21_8_2025-05-17T04:00:00.000Z.png"]
426	11	21	t	1600	2025-05-17	["PaymentReceipt_d141a7e4350844688444201e0438071e_21_11_2025-05-17T04:00:00.000Z.png"]
419	4	21	t	1600	2025-05-17	["PaymentReceipt_878314fc2350494fb16b8aa6644964f3_21_4_2025-05-17T04:00:00.000Z.png"]
443	29	21	t	1600	2025-05-17	["PaymentReceipt_f90faaaaf1b74d0889ff0de6ad1d0d2e_21_29_2025-05-17T04:00:00.000Z.png"]
431	16	21	t	1600	2025-05-18	["PaymentReceipt_9b340a661cb7437f8040b53226360938_21_16_2025-05-18T04:00:00.000Z.png"]
434	19	21	t	1600	2025-05-18	["PaymentReceipt_d800673df1ae4506ad03f522765dc782_21_19_2025-05-18T04:00:00.000Z.png"]
439	25	21	t	1600	2025-05-18	["PaymentReceipt_ff2bfc1bbbbf439481ad25c502c897fd_21_25_2025-05-18T04:00:00.000Z.png"]
429	14	21	t	1600	2025-05-18	["PaymentReceipt_5fb34d4b51dd4639b8c5080d84659312_21_14_2025-05-18T04:00:00.000Z.png"]
421	6	21	t	1600	2025-05-18	["PaymentReceipt_109f339a405749169d1d3b05e1760880_21_6_2025-05-18T04:00:00.000Z.png"]
86	6	8	t	5000	2025-05-18	["PaymentReceipt_f9f9990755d242baa115dd73a24c18e2_8_6_2025-05-18T04:00:00.000Z.png"]
427	12	21	t	1600	2025-05-18	["PaymentReceipt_62eaf87424e042a4b2f4f982d3c3a996_21_12_2025-05-18T04:00:00.000Z.png"]
438	24	21	t	1600	2025-05-18	["PaymentReceipt_c17f114f61fe457783f5897cda8a6003_21_24_2025-05-18T04:00:00.000Z.png"]
436	21	21	t	1600	2025-05-19	["PaymentReceipt_d354d53e871b435ba86cbb62cc81c094_21_21_2025-05-19T04:00:00.000Z.png"]
430	15	21	t	1600	2025-05-19	["PaymentReceipt_a9b74cb144874589bf53de299ef58f29_21_15_2025-05-19T04:00:00.000Z.png"]
433	18	21	t	1600	2025-05-19	["PaymentReceipt_383ce2e4822a41d8b42702a8a8a311ba_21_18_2025-05-19T04:00:00.000Z.png"]
72	18	7	t	5000	2025-05-19	["PaymentReceipt_9353d4551ec34d6dbd7b48bf75d52d85_7_18_2025-05-19T04:00:00.000Z.png"]
\.


--
-- Name: events_students_id_seq; Type: SEQUENCE SET; Schema: academics; Owner: amancay
--

SELECT pg_catalog.setval('academics.events_students_id_seq', 443, true);


--
-- Name: events_students events_students_pkey; Type: CONSTRAINT; Schema: academics; Owner: amancay
--

ALTER TABLE ONLY academics.events_students
    ADD CONSTRAINT events_students_pkey PRIMARY KEY (id);


--
-- Name: events_students unique_student_event; Type: CONSTRAINT; Schema: academics; Owner: amancay
--

ALTER TABLE ONLY academics.events_students
    ADD CONSTRAINT unique_student_event UNIQUE (student_id, event_id);


--
-- Name: events_students fk_events; Type: FK CONSTRAINT; Schema: academics; Owner: amancay
--

ALTER TABLE ONLY academics.events_students
    ADD CONSTRAINT fk_events FOREIGN KEY (event_id) REFERENCES academics.events(id);


--
-- Name: events_students fk_students; Type: FK CONSTRAINT; Schema: academics; Owner: amancay
--

ALTER TABLE ONLY academics.events_students
    ADD CONSTRAINT fk_students FOREIGN KEY (student_id) REFERENCES academics.students(id);


--
-- PostgreSQL database dump complete
--

