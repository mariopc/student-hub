import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Row,
    Column,
    Hr,
    Img,
} from '@react-email/components';

const amountInSpanish = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

interface PaidFee {
    description: string;
    amount: number;
    date: string;
}

interface DueFee {
    description: string;
    amount: number;
    dueDate: string;
    isLate: boolean;
}

interface StudentPaymentInfo {
    studentName: string;
    parentName: string;
    currentMonth: string;
    schoolName: string;
    paidFees: PaidFee[];
    dueFees: DueFee[];
    contactName: string;
    contactEmail: string;
    contactPhone: string;
}
export const FeesSummaryEmail: React.FC<Readonly<StudentPaymentInfo>> = ({
    studentName,
    parentName,
    currentMonth,
    schoolName,
    paidFees,
    dueFees,
    contactName,
    contactEmail,
    contactPhone,
}) => {
    const totalPaid = paidFees.reduce((sum, fee) => sum + fee.amount, 0);
    const totalDue = dueFees.reduce((sum, fee) => sum + fee.amount, 0);
    const lateFees = dueFees.filter(fee => fee.isLate);
    const totalLate = lateFees.reduce((sum, fee) => sum + fee.amount, 0);

    const currentDate = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const paidFeesSorted = paidFees.sort((a, b) => {
        const dateA = new Date(a.date.split('-').reverse().join('-'));
        const dateB = new Date(b.date.split('-').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
    })

    const dueFeesSorted = dueFees.sort((a, b) => {
        const dateA = new Date(a.dueDate.split('-').reverse().join('-'));
        const dateB = new Date(b.dueDate.split('-').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
    })

    return (
        <Html>
            <Head />
            <Preview>
                {schoolName} - Resumen Cuotas {studentName} - {currentMonth} 2025
            </Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Img
                            src="https://mnpc.xyz/amancay_logo.png"
                            alt={`${schoolName} Logo`}
                            width="100"
                            height="100"
                        />
                        <Heading as="h1" style={heading}>
                            Resumen cuotas 3° Básico
                        </Heading>
                        <Text style={date}>
                            {currentDate}
                        </Text>
                    </Section>

                    <Section>
                        <Text style={paragraphGreet}>
                            {parentName},
                        </Text>
                        <Text style={paragraphGreet}>
                            A continuación se presenta un resumen de la cuenta de cuotas de curso para {studentName} al cierre de {currentMonth} de 2025.
                        </Text>
                    </Section>

                    <Section style={summaryBox}>
                        <Row>
                            <Column>
                                <Text style={summaryLabel}>Total pagado:</Text>
                                <Text style={summaryAmount}>${amountInSpanish(totalPaid)}</Text>
                            </Column>
                            <Column>
                                <Text style={summaryLabel}>Saldo vencido:</Text>
                                <Text style={{ ...summaryAmount, color: '#d23f3f' } as React.CSSProperties}>${amountInSpanish(totalLate)}</Text>
                            </Column>
                            <Column>
                                <Text style={summaryLabel}>Total a pagar:</Text>
                                <Text style={summaryAmount}>${amountInSpanish(totalDue)}</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={sectionStyle}>
                        <Heading as="h2" style={subheading}>
                            Cuotas pagadas
                        </Heading>
                        {paidFees.length === 0 ? (
                            <Text style={paragraph}>Sin pagos realizados.</Text>
                        ) : (
                            paidFeesSorted.map((fee, index) => (
                                <Row key={index} style={index % 2 === 0 ? rowEven : rowOdd}>
                                    <Column style={col1}>
                                        <Text style={feeText}>{fee.description}</Text>
                                    </Column>
                                    <Column style={col2}>
                                        <Text style={feeText}>
                                            {new Date(fee.date).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </Text>
                                    </Column>
                                    <Column style={col3}>
                                        <Text style={feeAmountText}>${amountInSpanish(fee.amount)}</Text>
                                    </Column>
                                </Row>
                            ))
                        )}
                    </Section>

                    {lateFees.length > 0 && (
                        <Section style={sectionStyle}>
                            <Heading as="h2" style={{ ...subheading, color: '#d23f3f' } as React.CSSProperties}>
                                Cuotas vencidas
                            </Heading>
                            {lateFees.map((fee, index) => (
                                <Row key={index} style={index % 2 === 0 ? rowEven : rowOdd}>
                                    <Column style={col1}>
                                        <Text style={feeText}>{fee.description}</Text>
                                    </Column>
                                    <Column style={col2}>
                                        <Text style={{ ...feeText, color: '#d23f3f' } as React.CSSProperties}>
                                            Vencimiento: {new Date(fee.dueDate).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                            })}
                                        </Text>
                                    </Column>
                                    <Column style={col3}>
                                        <Text style={{ ...feeAmountText, color: '#d23f3f' } as React.CSSProperties}>${amountInSpanish(fee.amount)}</Text>
                                    </Column>
                                </Row>
                            ))}
                        </Section>
                    )}

                    <Section style={sectionStyle}>
                        <Heading as="h2" style={subheading}>
                            Próximas cuotas
                        </Heading>
                        {dueFees.filter(fee => !fee.isLate).length === 0 ? (
                            <Text style={paragraph}>Sin próximas cuotas.</Text>
                        ) : (
                            dueFeesSorted.filter(fee => !fee.isLate)
                                .map((fee, index) => (
                                    <Row key={index} style={index % 2 === 0 ? rowEven : rowOdd}>
                                        <Column style={col1}>
                                            <Text style={feeText}>{fee.description}</Text>
                                        </Column>
                                        <Column style={col2}>
                                            <Text style={feeText}>
                                                Vence: {new Date(fee.dueDate).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                })}
                                            </Text>
                                        </Column>
                                        <Column style={col3}>
                                            <Text style={feeAmountText}>${amountInSpanish(fee.amount)}</Text>
                                        </Column>
                                    </Row>
                                ))
                        )}
                    </Section>

                    <Section style={contactSection}>
                        <Text style={paragraph}>
                            La cuenta para transferencias es la siguiente:
                        </Text>
                        <Text style={contactText}>
                            Nombre: Mario Peña Campos<br />
                            Rut: 17.319.084-0<br />
                            Banco: Bci<br />
                            Cuenta Corriente: 777917319084<br />
                            Correo: mario.pc@protonmail.com
                        </Text>
                    </Section>

                    {/* Contact Information */}
                    <Section style={contactSection}>
                        <Text style={paragraph}>
                            Si tiene alguna pregunta sobre este estado de cuenta puedes contactarme:
                        </Text>
                        <Text style={contactText}>
                            {contactName}<br />
                            Email: {contactEmail}<br />
                            Whatsapp: {contactPhone}
                        </Text>
                    </Section>

                    <Hr style={divider} />

                    {/* Footer */}
                    <Section style={footer}>

                        <Text style={footerText}>
                            Este correo ha sido elaborado por la directiva del curso con fines informativos y de gestión interna. Su contenido no representa una comunicación oficial del colegio como institución ni compromete formalmente a la entidad educativa.
                            Este es un mensaje automático. Por favor, no responda a este correo.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

const main: React.CSSProperties = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    padding: '20px 0',
};

const container: React.CSSProperties = {
    backgroundColor: '#ffffff',
    maxWidth: '756px',
    margin: '0 auto',
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};

const header: React.CSSProperties = {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    textAlign: 'center',
    borderBottom: '1px solid #e6e6e6',
};

const heading: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    margin: '16px 0 8px',
};

const date: React.CSSProperties = {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 8px',
};

const paragraph: React.CSSProperties = {
    fontSize: '15px',
    lineHeight: '1.5',
    color: '#444',
    margin: '16px 0',
};

const paragraphGreet: React.CSSProperties = {
    fontSize: '15px',
    lineHeight: '1.5',
    color: '#444',
    margin: '16px 1em',
};

const summaryBox: React.CSSProperties = {
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    margin: '20px 0',
    padding: '15px',
    textAlign: 'center',
};

const summaryLabel: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555',
    margin: '0',
};

const summaryAmount: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    margin: '8px 0 0',
};

const sectionStyle: React.CSSProperties = {
    margin: '24px 0',
    padding: '0 20px',
};

const subheading: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    margin: '16px 0',
};

const rowEven: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '8px 0',
};

const rowOdd: React.CSSProperties = {
    backgroundColor: '#f9f9f9',
    padding: '8px 0',
};

const col1: React.CSSProperties = {
    width: '50%',
};

const col2: React.CSSProperties = {
    width: '25%',
};

const col3: React.CSSProperties = {
    width: '25%',
    textAlign: 'right',
};

const feeText: React.CSSProperties = {
    fontSize: '14px',
    margin: '0',
    color: '#333',
};

const feeAmountText: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0',
    color: '#333',
};

const ctaContainer: React.CSSProperties = {
    textAlign: 'center',
    margin: '32px 0',
};

const ctaButton: React.CSSProperties = {
    backgroundColor: '#3f6ad8',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    padding: '12px 24px',
    borderRadius: '4px',
    display: 'inline-block',
};

const contactSection: React.CSSProperties = {
    backgroundColor: '#f8f9fa',
    padding: '16px 20px',
    borderRadius: '4px',
    margin: '24px 0px',
};

const contactText: React.CSSProperties = {
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#555',
    margin: '8px 0',
};

const divider: React.CSSProperties = {
    borderTop: '1px solid #e6e6e6',
    margin: '24px 0',
};

const footer: React.CSSProperties = {
    textAlign: 'center',
    padding: '0 20px 20px',
};

const footerText: React.CSSProperties = {
    fontSize: '12px',
    color: '#999',
    margin: '8px 0',
};

export default FeesSummaryEmail;