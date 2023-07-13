export function validateSchema(schema) {
    return (req, res, next) => {
        let validation;
        validation = schema.validate(req.body, {abortEarly: false});
        if (validation.error){
            const erros = validation.error.details.map(erro => erro.message);
            return res.status(422).send(erros);
        }
        next();
    }
}