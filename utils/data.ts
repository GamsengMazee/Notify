// Mock data for previous notifications
export const previousNotifications = [
  {
    id: 1,
    title: 'New Product Launch',
    body: 'Check out our latest smartphone with amazing features!',
    target: 'all_users',
    status: 'delivered',
    sent: '2024-01-15T10:30:00Z',
    delivered: 15420,
    clicked: 2341,
    imageUrl: 'http://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    title: 'Flash Sale Alert',
    body: '50% off on all electronics! Limited time offer.',
    target: 'premium_users',
    status: 'delivered',
    sent: '2024-01-14T14:15:00Z',
    delivered: 8934,
    clicked: 1876,
    imageUrl: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    title: 'App Update Available',
    body: 'New features and bug fixes are now available.',
    target: 'all_users',
    status: 'pending',
    sent: '2024-01-13T09:00:00Z',
    delivered: 0,
    clicked: 0,
    imageUrl: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    title: 'Welcome to Premium',
    body: 'Thanks for upgrading! Enjoy exclusive benefits.',
    target: 'new_premium',
    status: 'delivered',
    sent: '2024-01-12T16:45:00Z',
    delivered: 234,
    clicked: 89,
    imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];


   export const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });