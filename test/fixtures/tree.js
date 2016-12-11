export const women = {
    label: 'Women',
    children: [{
        label: 'Clothing',
        children: [{
            label: 'Dresses',
            children: [],
            uriPath: '/shop/Women/Clothing/Dresses'
        }],
        uriPath: '/shop/Women/Clothing'
    }],
    uriPath: '/shop/Women'
};

export const men = {
    label: 'Men',
    children: [{
        label: 'Clothing',
        children: [{
            label: 'Dress Shirts',
            children: [],
            uriPath: '/shop/Men/Clothing/Dress Shirts'
        }],
        uriPath: '/shop/Men/Clothing'
    }],
    uriPath: '/shop/Men'
};

export const kids = {
    label: 'Kids',
    embedded: [{
        label: 'Clothing',
        embedded: [{
            label: 'Shirts',
            embedded: [],
            uriPath: '/shop/Kids/Clothing/Dress Shirts'
        }],
        uriPath: '/shop/Kids/Clothing'
    }],
    uriPath: '/shop/Kids'
};

export default [women, men];
