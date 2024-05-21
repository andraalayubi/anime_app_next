import prisma from "@/libs/prisma"
export async function POST(request, res) {
    console.log('Delete comment route');
    const { userEmail } = request.body;

    try {
        const deletedComments = await prisma.comment.deleteMany({
            where: {
                user_email: userEmail,
            },
        });

        res.status(200).json({ message: `${deletedComments.count} comments deleted` });
    } catch (error) {
        console.error('Error deleting comments:', error);
        res.status(500).json({ message: 'Error deleting comments' });
    }
}