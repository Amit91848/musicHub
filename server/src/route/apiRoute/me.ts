import { Router } from "express";
import { findUserById } from "../../controllers/UserController";
import { findProfileOfUser } from "../../controllers/ProfileController";

const router = Router();

router.get('/', async (req, res) => {
    //@ts-ignore
    const userId = req.user.userId;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await findUserById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const spotifyProfile = await findProfileOfUser(userId, 'spotify')
    const googleProfile = await findProfileOfUser(userId, 'youtube');

    const cleanProfile = (profile: Awaited<ReturnType<typeof findProfileOfUser>>) => {
        return profile ? {
            name: profile.name,
            picture: profile.picture,
            userId: profile.userId,
            // oauthId: profile.oauthId
        } : null;
    }

    return res.status(200).json({
        id: user._id,
        spotify: cleanProfile(spotifyProfile),
        google: cleanProfile(googleProfile),
        spotifyConnected: !!spotifyProfile,
        googleConnected: !!googleProfile,
    });
});

export default router;
