export type Profile = {
    name: {
        firstName: String,
        lastName: String,
        middleName?: String
    },
    username: String,
    password: String
};