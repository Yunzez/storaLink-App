"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// * This middleware is used to validate if the user is the owner of the resource
const validateUserOwnership = (model) => {
    return (req, res, next) => {
        const { id } = req.params; // Assuming the parameter name is 'id' for both Folder and Link
        const mongoUserId = req.userId;
        model
            .findById(id)
            .exec()
            .then((item) => {
            if (!item) {
                return res
                    .status(404)
                    .json({ message: `${model.modelName} not found` });
            }
            if (item.creatorId !== mongoUserId) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            next();
        })
            .catch((err) => res.status(500).json({ error: err }));
    };
};
exports.default = validateUserOwnership;
