const Bar = require('../model/bar');
const Beer = require('../model/beer');
let methods = {};

methods.findAll = (req, res) => {
    Bar.findAll().then((result) => {
        res.json(result);
    })
};

methods.findById = (req, res) => {
    const {id} = req.params;
    if (isNaN(parseInt(id))) return res.status(400).json('Id not a number');
    Bar.findByPk(id).then((result) => {
        if (!result) {
            return res.status(404).json('Resource not found');
        }
        res.json(result);
    }).catch(err => res.status(500).json({message: 'Internal server error'}));
};

methods.create = (req, res) => {
    Bar.create({...req.body}).then((result) => {
        res.status(201).json(result);
    })
};

methods.update = (req, res) => {
    const {name, age} = req.body;
    Bar.update(
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
    Bar.destroy({
        where: {
            id: parseInt(req.params.id),
        },
    }).then((result) => {
        res.json(result);
    });
}

methods.addBeer = async (req, res) => {
    const {idBar, idBeer} = req.params;
    try {
        const bar = await Bar.findByPk(parseInt(idBar));
        if (!bar) {
            return res.status(404).json({message: 'Bar not found'});
        }
        const beer = await Beer.findByPk(parseInt(idBar));
        if (!beer) {
            return res.status(404).json({message: 'Beer not found'});
        }
        await bar.addBeer(beer);
        res.status(200).json({message: `Beer ${idBeer} added to Bar ${idBar}`});
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Internal server error'});
    }
}

methods.removeBeer = async (req, res) => {
    const {idBar, idBeer} = req.params;
    try {
        const bar = await Bar.findByPk(parseInt(idBar));
        if (!bar) {
            return res.status(404).json({message: 'Bar not found'});
        }
        const beer = await Beer.findByPk(parseInt(idBar));
        if (!beer) {
            return res.status(404).json({message: 'Beer not found'});
        }
        await bar.removeBeer(beer);
        res.status(200).json({message: `Beer ${idBeer} removed to Bar ${idBar}`});
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Internal server error'});
    }
}

methods.findBeers = async (req, res) => {
    const {id} = req.params;
    try {
        const bar = await Bar.findByPk(id);
        if (!bar) {
            return res.status(404).json({message: 'Bar not found'});
        }

        const beers = await bar.getBeers();

        res.json(beers);
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Internal server error'});
    }
}

methods.findOrders = async (req, res) => {
    const {id} = req.params;
    try {
        const bar = await Bar.findByPk(id);
        if (!bar) {
            return res.status(404).json({message: 'Bar not found'});
        }

        const orders = await bar.getOrders();

        res.json(orders);
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Internal server error'});
    }
}


module.exports = methods;