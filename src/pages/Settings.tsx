import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <Tabs defaultValue="mongo">
        <TabsList>
          <TabsTrigger value="mongo">Mongo</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="lists">Lists</TabsTrigger>
        </TabsList>
        <TabsContent value="mongo">
          <p>Mongo settings will go here.</p>
        </TabsContent>
        <TabsContent value="users">
          <p>Users settings will go here.</p>
        </TabsContent>
        <TabsContent value="images">
          <p>Images settings will go here.</p>
        </TabsContent>
        <TabsContent value="videos">
          <p>Videos settings will go here.</p>
        </TabsContent>
        <TabsContent value="lists">
          <p>Lists settings will go here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
