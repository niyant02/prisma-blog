const Mutation = {
    // Create new User
    async createUser(parent, { data }, { prisma }, info) {
        return prisma.query.createUser(data, info);
    },

    // Create new Post
    async createPost(parent, { data }, { prisma }, info) {
        return prisma.query.createPost(data, info);
    },
};

export { Mutation as default };
