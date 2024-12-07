import { Card, CardContent, CardHeader } from "../ui/card";

const ChatDontExists = ({ roomName }: { roomName: string }) => {
  return (
    <section>
      <div className="container">
        <Card className="py-1 px-1 flex-col gap-4 relative mb-4">
          <CardHeader>
            <h2 className="text-[32px] text-center mb-4">Room Not Found</h2>
          </CardHeader>
          <CardContent>
            <p className="text-center">
              {`The room "${roomName}" does not exist.`}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ChatDontExists;
