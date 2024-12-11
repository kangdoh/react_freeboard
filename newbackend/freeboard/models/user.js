const Sequelize = require('sequelize');

class User extends Sequelize.Model{
    static initiate(sequelize){
        User.init({
            name:{

            },
            age:{

            },
            married:{

            },
            commnet:{

            },
            created_at:{

            },
        })
    }
}