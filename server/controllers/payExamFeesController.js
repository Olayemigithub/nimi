import { processPayment } from './paymentController.js';

export async function payExamFees(req, res) {
    req.body.type = 'examFee';
    return processPayment(req, res);
}
