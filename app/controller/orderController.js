const Order = require('../model/order');
const Beer = require("../model/beer");
let methods = {};

methods.findAll = (req, res) => {
    Order.findAll().then((result) => {
        res.json(result);
    })
};

methods.findById = (req, res) => {
    const {id} = req.params;
    Order.findByPk(id).then((result) => {
        if (!result) {
            return res.status(404).json('Resource not found');
        }
        res.json(result);
    }).catch(err => res.status(500).json({message: 'Internal server error', err}));
};

methods.create = (req, res) => {
    Order.create({...req.body}).then((result) => {
        res.status(201).json(result);
    })
};

methods.update = (req, res) => {
    const {name, price, date, status} = req.body;
    if (status === 'completed') {
        return res.status(400).json({message: 'Completed order can\'t be updated'})
    }
    Order.update(
        {name, price, date, status},
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
        const order = await Order.findByPk(idOrder);
        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }
        console.log(order)
        const beer = await Beer.findByPk(idBeer);
        if (!beer) {
            return res.status(404).json({message: 'Beer not found'});
        }
        console.log(beer)
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
        const beer = await Beer.findByPk(parseInt(idBeer));
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

        // const beers = await order.getBeerOrders();

        // res.json(beers);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Internal server error'});
    }
}


module.exports = methods;