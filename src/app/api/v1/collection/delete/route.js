import prisma from "@/libs/prisma"
export async function POST(request, res) {
    console.log('Delete collection route');
    const { userEmail } = request.body;

    try {
        const deletedCollections = await prisma.collection.deleteMany({
            where: {
                user_email: userEmail,
            },
        });

        res.status(200).json({ message: `${deletedCollections.count} collections deleted` });
    } catch (error) {
        console.error('Error deleting collections:', error);
        res.status(500).json({ message: 'Error deleting collections' });
    }
}