const Query = {
    // Get All User array
    async users(parent, args, { prisma }, info) {
        const conditions = {};

        if (args.query) {
            conditions.where = {
                OR: [
                    { name_contains: args.query },
                    { email_contains: args.query },
                ],
            };
        }

        return prisma.query.users(conditions, info);
    },

    // Get User
    async user(parent, args, { prisma }, info) {
        return prisma.query.user(
            {
                where: {
                    id: args.id,
                },
            },
            info
        );
    },

    // Get All Post array
    async posts(parent, args, { prisma }, info) {
        const conditions = {};

        if (args.query) {
            conditions.where = {
                OR: [
                    { title_contains: args.query },
                    { content_contains: args.query },
                ],
            };
        }
        return prisma.query.posts(conditions, info);
    },

    // Get Post
    async post(parent, args, { prisma }, info) {
        return prisma.query.post(
            {
                where: {
                    id: args.id,
                },
            },
            info
        );
    },
};

export { Query as default };
