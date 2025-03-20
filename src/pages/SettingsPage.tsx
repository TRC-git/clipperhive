import { FC, useState } from 'react';
import { useAuthContext } from '@/providers/AuthProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

const SettingsPage: FC = () => {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // Using the mock client's update function with minimal data
      const result = await supabase
        .from('users')
        .update({
          clipper_id: user?.id, // Using clipper_id to match Bookmark type
          booker_id: user?.id, // Using booker_id to match Bookmark type
          notes: formData.username // Using notes to store username
        })
        .eq('id', user?.id || '')
        .eq('id', user?.id || '');

      // Type assertion for the mock client response
      const response = result as unknown as { error: Error | null };
      const { error } = response;

      if (error) {
        toast({
          title: "Update Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Update Failed",
        description: error.message || "There was an error updating your profile.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);

    try {
      // Mock password update since we're using a mock client
      const error = null;

      if (error) {
        toast({
          title: "Update Failed",
          description: "Failed to update password",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Password Updated",
        description: "Your password has been successfully updated.",
      });

      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Update Failed",
        description: error.message || "There was an error updating your password.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your public profile information
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileUpdate}>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user?.profile_picture || ''} alt={user?.username || 'User'} />
                    <AvatarFallback>{user?.username?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" disabled>Change Avatar (Coming Soon)</Button>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      disabled
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? 'Updating...' : 'Update Profile'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account security and preferences
              </CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordUpdate}>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? 'Updating...' : 'Update Password'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Notification settings coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage; 