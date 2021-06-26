//export functions to make this file reusable

export function getJSON(url){
    return fetch(url)
        //.then() method call to process the response of your request.
        .then(function(response){
            //ok flag - more checking
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        // .catch(). We can use this to do some checking on how successful our fetch was./Error checking
        .catch(function(error) {
            console.log(error);
        });
}
//"Promisefied" version of the method to return the current location of the user.
export const getLocation = function(options) {
    return new Promise(function(resolve, reject) {
        // navigator.geolocation ask user's permission
        // getCurrentPosition retrieves the device's current location.
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};
