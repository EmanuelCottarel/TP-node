const Order = require('../model/order');
const Bar = require("../model/bar");
const Beer = require("../model/beer");
let methods = {};

methods.findAll = (req, res) => {
    Order.findAll().then((result) => {
        res.json(result);
    })
};

methods.findById = (req, res) => {
    const {id} = req.params;
    if (isNaN(parseInt(id))) return res.status(400).json('Id not a number');
    Order.findByPk(id).then((result) => {
        if (!result) {
            return res.status(404).json('Resource not found');
        }
        res.json(result);
    }).catch(err => res.status(500).json({message: 'Internal server error'}));
};

methods.create = (req, res) => {
    Order.create({...req.body}).then((result) => {
        res.status(201).json(result);
    })
};

methods.update = (req, res) => {
    const {name, age} = req.body;
    Order.update(
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
    Order.destroy({
        where: {
            id: parseInt(req.params.id),
        },
    }).then((result) => {
        res.json(result);
    });
}

methods.addBeer = async (req, res) => {
    const {idOrder, idBeer} = req.params;
    try {
        const order = await Order.findByPk(parseInt(idOrder));
        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }
        const beer = await Beer.findByPk(parseInt(idOrder));
        if (!beer) {
            return res.status(404).json({message: 'Beer not found'});
        }
        await order.addBeer(beer);
        res.status(200).json({message: `Beer ${idBeer} added to Order ${idOrder}`});
    } catch (e) {
        console.error(e)
        res.status(500).json({message: 'Internal server error'});
    }
}

methods.removeBeer = async (req, res) => {
    const {idOrder, idBeer} = req.params;
    try {
        const order = await Order.findByPk(parseInt(idOrder));
        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }
        const beer = await Beer.findByPk(parseInt(idOrder));
        if (!beer) {
            return res.status(404).json({message: 'Beer not found'});
        }
        await order.removeBeer(beer);
        res.status(200).json({message: `Beer ${idBeer} removed to Order ${idOrder}`});
    } catch (e) {
        console.error(e)
        res.status(500).json({message: 'Internal server error'});
    }
}

methods.findBeers = async (req, res) => {
    const {id} = req.params;
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }

        const beers = await order.getBeers();

        res.json(beers);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Internal server error'});
    }
}


module.exports = methods;