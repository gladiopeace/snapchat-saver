const sql = require('mssql');
const config = {
    user: 'dbuser',
    password: 'dbuser',
    server: 'localhost',
    database: 'SessionRatingDB',
    options: {
        instanceName: 'SQLEXPRESS',
    }
};

var srDataAccessManager = {};
var Speaker = require('../LogicLayer/BL/Session'); 

srDataAccessManager.getSpeakers = function(sqlSucess, sqlError){

    sqlQuery("select * from dbo.Speaker;", (result) => {
        sqlSucess(result);
    }, 
    (err) => {
        sqlError(err);
    }
);
}

srDataAccessManager.getSessions = function(sqlSuccess, sqlError){
    sqlQuery("select * from dbo.Session;", 
    (result) => {
        sqlSuccess(result);
    }, 
    (err) => {
        sqlError(err);
    }
);
}

srDataAccessManager.getSessionByID = function(sessionId, sqlSuccess, sqlError){
    sqlQuery("select * from dbo.Session where Session.SessionID = " + sessionId + ";", 
    (result) => {
        sqlSuccess(result);
    }, 
    (err) => {
        sqlError(err);
    }
);
}

srDataAccessManager.getAllRatings = function(sqlSuccess, sqlError){
    sqlQuery("select * from dbo.rating;", 
    (result) => {
        sqlSuccess(result);
    },
    (err) => {
        sqlError(err);
    }
);
}

srDataAccessManager.getRatingBySessionId = function (sessionId, sqlSuccess, sqlError){
    sqlQuery("select * from dbo.Rating where Rating.SessionId = " + sessionId + ";", 
    (result) => {
        sqlSuccess(result);
    }, 
    (err) => {
        sqlError(err);
    });
}

srDataAccessManager.postRating = function(sessionID, RatingValue, sqlSuccess, sqlError){
    sqlQuery("insert into rating values(" + RatingValue + ", " + null + ", " + sessionID + ");", 
    (result) => {
        sqlSuccess(result);
    }, 
    (err) => {
        sqlError(err);
    });
}

srDataAccessManager.postSession = function(title, speakerId, sqlSuccess, sqlError){
    sqlQuery("insert into session values('" + title + "', " + speakerId + ");", 
    (result) => {
        sqlSuccess(result);
    }, 
    (err) => {
        sqlError(err);
    });
}

srDataAccessManager.deleteSession = function(sessionID, sqlSuccess, sqlError){
    sqlQuery("DELETE FROM session WHERE session.sessionId = " + sessionID + ";", 
    (result) => {
        sqlSuccess(result);
    }, 
    (err) => {
        sqlError(err);
    });
}



function sqlQuery (query, sqlSuccess, sqlError){
    sql.close();
    sql.connect(config, err => {
        // ... error checks
        if (err) {
            sqlError(err);
        } else {
            console.log("connected");
    
            // execute (very) simple query    
            new sql.Request().query(query, (err, result) => {
                if (err) {
                    sqlError(err);
                } else {
                    sqlSuccess(result); 
                }
            });
        }
    });
}

module.exports = srDataAccessManager;