import { check } from "express-validator";

export const userValidate = [
    check("pk_id_user", "La cédula es obligatoria y debe tener máximo 11 caracteres numéricos")
        .not()
        .isEmpty()
        .isLength({ min: 8, max: 11 })
        .isNumeric({ no_symbols: true })
        .toInt(),
    check("name_user", "El nombre es obligatorio y debe tener máximo 50 caracteres")
        .not()
        .isEmpty()
        .isLength({ max: 50 }),
    check("password_user", "La contraseña es obligatoria y debe tener entre 6 y 50 caracteres")
        .not()
        .isEmpty()
        .isLength({ min: 6, max: 50 }),
    check("phone_user", "El teléfono es obligatorio y debe tener máximo 10 caracteres numéricos")
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({ max: 10 }),
    check("address_email_user", "El correo electrónico es obligatorio y debe ser válido")
        .not()
        .isEmpty()
        .isEmail()
        .isLength({ max: 50 }),
    check("country_user", "El país es obligatorio")
        .not()
        .isEmpty(),
    check("job_user", "El trabajo trabajo es obligatoria")
        .not()
        .isEmpty(),
    check("gender_identity_user")
        .not()
        .isEmpty()
        .withMessage("La identidad de género es obligatoria")
        .isIn(['masculino', 'femenino', 'no_binario', 'genero_fluido', 'agenero', 'transgenero', 'privado'])
        .withMessage("La identidad de género debe ser uno de los siguientes: masculino, femenino, no binario, género fluido, agénero, transgénero, privado"),
];

export const userStatus = [
    check("status_user")
        .not()
        .isEmpty()
        .withMessage("El estado a cambiar es obligatorio")
        .isIn(['activo', 'inactivo', 'suspendido', 'baneado', 'verificado'])
        .withMessage("El estado a cambiar debe ser uno de los siguientes: activo, inactivo, suspendido, baneado, verificado "),
]

export const userPassword = [
    check("oldPassword", "La contraseña es obligatoria y debe tener entre 6 y 50 caracteres")
        .not()
        .isEmpty()
        .isLength({ min: 6, max: 50 }),
    check("newPassword", "La contraseña es obligatoria y debe tener entre 6 y 50 caracteres")
        .not()
        .isEmpty()
        .isLength({ min: 6, max: 50 }),
    check("confirmPassword", "La contraseña es obligatoria y debe tener entre 6 y 50 caracteres")
        .not()
        .isEmpty()
        .isLength({ min: 6, max: 50 }),
]