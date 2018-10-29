const graphql = require('graphql');
const Product = require('../models/product');
const Brand = require('../models/brand');


const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull} = graphql;

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        category: {type: GraphQLString},
        brand: {
            type: BrandType,
            resolve(parent, args) {
                return Brand.findById(parent.brandId)
            }
        }
    })
});
const BrandType = new GraphQLObjectType({
    name: 'Brand',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({brandId: parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        product: {
            type: ProductType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Product.findById(args.id)
            }
        },
        brand: {
            type: BrandType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Brand.findById(args.id)

            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({})
            }
        },
        brands: {
            type: new GraphQLList(BrandType),
            resolve(parent, args) {
                return Brand.find({})
            }
        }
    }
});
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBrand: {
            type: BrandType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let brand = new Brand({
                    name: args.name
                });
                return brand.save()
            }
        },
        addProduct: {
            type: ProductType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString) },
                category: {type: new GraphQLNonNull(GraphQLString) },
                brandId: {type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                let product = new Product({
                    name: args.name,
                    category: args.category,
                    brandId: args.brandId
                });
                return product.save()
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
