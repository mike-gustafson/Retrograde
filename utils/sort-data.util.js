function sortData(data, method) {
    
    if (method === 'alphaUp') {
        data.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            } else {
                return 0;
            }
        });
        return data;
    };

    if (method === 'alphaDown') {
        sortedData = data.sort((a, b) => {
            if (a.name > b.name) {
                return -1;
            } else if (a.platform < b.platform) {
                return 1;
            } else {
                return 0;
            }
        });
        return data;
    };

    if (method === 'dateUp') {
        data.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
                return -1;
            } else if (a.createdAt > b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        });
        return data;
    };

    if (method === 'dateDown') {
        data.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        });
        return data;
    };

    return data;
}

module.exports = sortData;