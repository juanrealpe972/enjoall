import { check } from 'express-validator';

export const validateIncome = [
    check('description_inc')
        .notEmpty()
        .withMessage('La descripción del ingreso es obligatoria.')
        .isLength({ max: 255 })
        .withMessage('La descripción no puede exceder los 255 caracteres.'),
    check('amount_inc')
        .notEmpty()
        .withMessage('El monto del ingreso es obligatorio.')
        .isNumeric()
        .withMessage('El monto debe ser un número.')
        .custom(value => {
            if (value <= 0) {
                throw new Error('El monto debe ser mayor que cero.');
            }
            return true;
        }),
    check('date_inc')
        .notEmpty()
        .withMessage('La fecha del ingreso es obligatoria.')
        .isISO8601()
        .withMessage('La fecha debe estar en formato ISO 8601 (YYYY-MM-DDTHH:mm:ssZ).'),
    check('fk_user_inc')
        .notEmpty()
        .withMessage('El ID del usuario es obligatorio.')
        .isNumeric()
        .withMessage('El ID del usuario debe ser un número.')
];