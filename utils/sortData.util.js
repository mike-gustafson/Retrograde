function sortData(data, method) {
let sortedData;
    if (method === 'alphaUp') {
        sortedData = data.sort((a, b) => {
            if (a.platform < b.platform) {
                return -1;
            } else if (a.platform > b.platform) {
                return 1;
            } else {
                return 0;
            }
        });
    };

    if (method === 'alphaDown') {
        sortedData = data.sort((a, b) => {
            if (a.platform > b.platform) {
                return -1;
            } else if (a.platform < b.platform) {
                return 1;
            } else {
                return 0;
            }
        });
    };

    if (method === 'dateUp') { 
        sortedData = data.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
                return -1;
            } else if (a.createdAt > b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        });
    };

    if (method === 'dateDown') {
        sortedData = data.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        });
    };
    
    return sortedData;
}

module.exports = sortData;