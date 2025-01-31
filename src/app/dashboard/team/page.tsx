import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const teamMembers = [
  {
    name: 'Alice Johnson',
    role: 'Team Lead',
    level: 'Gold',
    earnings: '₦1,200',
    avatar: '/avatar1.png',
  },
  {
    name: 'Bob Smith',
    role: 'Member',
    level: 'Silver',
    earnings: '₦800',
    avatar: '/avatar2.png',
  },
  {
    name: 'Charlie Brown',
    role: 'Member',
    level: 'Bronze',
    earnings: '₦500',
    avatar: '/avatar3.png',
  },
  {
    name: 'Diana Ross',
    role: 'Member',
    level: 'Bronze',
    earnings: '₦450',
    avatar: '/avatar4.png',
  },
];

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Team</h1>

      <Card>
        <CardHeader>
          <CardTitle>Team Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Total Members</div>
              <div className="text-2xl font-bold">4</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Earnings</div>
              <div className="text-2xl font-bold">₦2,950</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {teamMembers.map((member, index) => (
          <Card key={index}>
            <CardContent className="flex items-center space-x-4 py-4">
              <Avatar>
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold">{member.name}</div>
                <div className="text-sm text-gray-500">{member.role}</div>
              </div>
              <div className="text-right">
                <Badge variant="secondary">{member.level}</Badge>
                <div className="text-sm font-semibold mt-1">
                  {member.earnings}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
