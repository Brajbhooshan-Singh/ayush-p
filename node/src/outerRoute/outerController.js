const { loginModel, registerModel, viewAllModel, tenMinuteOlderModel, tenMinuteEarlierModel } = require('./outerModel');

class outerController {

    login(req, res) {
        const { email, password } = req.body;
        loginModel(email, password, res, (data, err) => {
            let response = { status: 0, data: data, error: null };
            if (data == false) {
                response.status = 0;
                response.error = err;
            }
            else {
                response.status = 1;
                response.data = data;
            }
            res.send(response);
        });
    }

    register(req, res) {
        const { first_name, last_name, email, phone_no, password, address, role } = req.body;
        registerModel(first_name, last_name, email, phone_no, password, address, role, (data, err) => {
            let response = { status: 0, data: data, error: err };
            if (data == false) {
                response.status = 0;
                response.error = err;
            }
            else {
                response.status = 1;
                response.data = data;
            }
            res.send(response);
        });
    }

    viewAll(req, res) {
        const { role, old, newer } = req.query;
        if (old) {
            tenMinuteOlderModel((data, err) => {
                let response = { status: 0, data: data, error: null };
                if (data === false) {
                    response.status = 0;
                    response.error = err;
                } else {
                    response.status = 1;
                    response.data = data;
                }
                res.send(response)
            });
        } else if (newer) {
            tenMinuteEarlierModel((data, err) => {
                let response = { status: 0, data: data, error: null };
                if (data === false) {
                    response.status = 0;
                    response.error = err;
                } else {
                    response.status = 1;
                    response.data = data;
                }
                res.send(response)
            });
        }
        else if (role) {
            if (role.includes('VIEW_ALL')) {
                viewAllModel((data, err) => {
                    let response = { status: 0, data: data, error: null };
                    if (data === false) {
                        response.status = 0;
                        response.error = err;
                    }
                    else {
                        response.status = 1;
                        response.data = data;
                    }
                    res.send(response);
                });
            }
            else {
                let response = { status: 0, data: false, error: 'You can not view all books!' };
                res.send(response);
            }
        } else {
            let response = { status: 0, data: false, error: 'Something went wrong, Try again!' };
            res.send(response);
        }

    }

    async logout(req, res){
        await res.clearCookie('token');
        res.send({status:1, data:'Logout successfull', error:null});
    }


}
module.exports = outerController;