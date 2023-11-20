db.createUser(
        {
            user: "ip-user",
            pwd: "ip-pwd",
            roles: [
                {
                    role: "readWrite",
                    db: "user-table"
                }
            ]
        }
);