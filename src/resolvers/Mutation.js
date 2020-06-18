const Mutation = {
    // Create new User
    async createUser(parent, { data }, { prisma }, info) {
        return prisma.mutation.createUser(data, info);
    },

    // Create new Post
    async createPost(parent, { data }, { prisma }, info) {
        return prisma.mutation.createPost(data, info);
    },
};

export { Mutation as default };
