import { processPayment } from './paymentController.js';

export async function standingInstruction(req, res) {
    req.body.type = 'standingInstruction';
    return processPayment(req, res);
}
