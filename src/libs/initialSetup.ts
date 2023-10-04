import Roles from '@Models/Roles';

export const initialModels = async () => {
    try {
        await Roles.find();
    } catch (error) {
        console.log("Initial models error: ", error);
    }
}