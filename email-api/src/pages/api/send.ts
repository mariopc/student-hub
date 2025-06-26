import type { NextApiRequest, NextApiResponse } from 'next';
import FeesSummaryEmail from '../../../transactional/emails/cuotas';

import { resend } from '../../lib/resend';

import { render } from '@react-email/render';

type Payload = {
    value: string;
}

const send = async (req: NextApiRequest, res: NextApiResponse) => {

    const { method } = req;

    switch (method) {
        case 'POST': {            
            const completeBody = req.body;
            const from = completeBody.from;
            const to = completeBody.to;
            const subject = completeBody.subject;
            delete completeBody.from;
            delete completeBody.to;
            delete completeBody.subject;

            const text = await render(await FeesSummaryEmail(completeBody), {
                plainText: true,
            });
              
            const emailResponse = await resend.emails.send({
                from,
                to,
                subject,
                react: await FeesSummaryEmail(completeBody),
                text,
            }
            );
            console.log('emailResponse', emailResponse);
            if (emailResponse.data) {
                return res.status(200).send({ data: emailResponse.data.id });
            } 
            return res.status(500).send({ error: 'Error sending email' });
        }
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};

export default send;
