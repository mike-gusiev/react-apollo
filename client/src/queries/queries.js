import {gql} from 'apollo-boost';

const getBrandsQuery = gql`
    {
        brands{
            name
            id
        }
    }
`;

const getProductsQuery = gql`
    {
        products{
            name
            id
            category
            brand{
                name
            }
        }
    }
`;

const addProductMutation = gql`
    mutation($name: String!, $category: String!, $brandId: ID!){
        addProduct(name: $name, category: $category, brandId: $brandId){
            name
            id
            category
            brand{
                name
            }
        }
    }
`;

export {getProductsQuery, getBrandsQuery, addProductMutation};
