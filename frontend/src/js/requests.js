const headers = (token = null) => {
    return {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
    };
};

var Requests = {
    get: (route, callback) => {
        $.ajax({
            url: url + '/' + route,
            headers: headers(token),
            dataType: "json",
            type: "GET",
            async: true,
            success: (response) => {

                callback(response);
            },
            error: function (xhr, error) {

                let message = xhr.responseJSON;
                console.log(message);
                console.log(error);
            },
        });
    },
    post: (route, data, callback) => {
        $.ajax({
            url: url + '/' + route,
            headers: headers(token),
            dataType: "json",
            type: "POST",
            data: data,
            async: true,
            success: (response) => {

                callback(response);
            },
            error: function (xhr, error) {

                let message = xhr.responseJSON;
                console.log(message);
                console.log(error);
            },
        });
    },
    put: (route, data, callback) => {
        $.ajax({
            url: url + '/' + route,
            headers: headers(token),
            dataType: "json",
            type: "PUT",
            data: data,
            async: true,
            success: (response) => {

                callback(response);
            },
            error: function (xhr, error) {

                let message = xhr.responseJSON;
                console.log(message);
                console.log(error);
            },
        });
    },
    delete: (route, data, callback) => {
        $.ajax({
            url: url + '/' + route,
            headers: headers(token),
            dataType: "json",
            type: "DELETE",
            data: data,
            async: true,
            success: (response) => {

                callback(response);
            },
            error: function (xhr, error) {

                let message = xhr.responseJSON;
                console.log(message);
                console.log(error);
            },
        });
    }
};

