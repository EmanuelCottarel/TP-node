const Beer = require('../model/beer');
let methods = {};

methods.findAll = (req, res) => {
    Beer.findAll().then((result) => {
        res.json(result);
    })
};

methods.findById = (req, res) => {
    const {id} = req.params;
    if (isNaN(parseInt(id))) return res.status(400).json('Id not a number');
    Beer.findByPk(id).then((result) => {
        if (!result) {
            return res.status(404).json('Resource not found');
        }
        res.json(result);
    }).catch(err => res.status(500).json({message: 'Internal server error'}));
};

methods.create = (req, res) => {
    console.log(req.body);
    Beer.create({...req.body}).then((result) => {
        res.status(201).json(result);
    })
};

methods.update = (req, res) => {
    const {name, age} = req.body;
    Beer.update(
        {name, age},
        {
            where: {
                id: parseInt(req.params.id),
            },
        },
    ).then((result) => {
        res.json(result);
    });
}

methods.delete = (req, res) => {
    Beer.destroy({
        where: {
            id: parseInt(req.params.id),
        },
    }).then((result) => {
        res.json(result);
    });
}


module.exports = methods;