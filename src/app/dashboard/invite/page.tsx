'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaXTwitter } from 'react-icons/fa6';
import {
  FaLink,
  FaWhatsapp,
  FaFacebook,
  FaTelegramPlane,
} from 'react-icons/fa';
import { useUserStore } from '@/store/store';
import { toast } from 'react-toastify';

export default function InvitePage() {
  const { referralCode } = useUserStore();
  const referralLink = `https://qwm.com/login?ref=${referralCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success('Referral link copied to clipboard!', {
        className: 'text-base font-bold',
      });
    } catch (error) {
      console.error('Failed to copy referral link:', error);
      alert('Failed to copy referral link');
    }
  };

  const handleShare = (platform: string) => {
    const encodedReferralLink = encodeURIComponent(referralLink);
    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedReferralLink}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedReferralLink}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedReferralLink}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedReferralLink}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Invite Friends & Earn</h1>

      <Card>
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input value={referralLink} readOnly />
            <Button variant="outline" onClick={handleCopy} type="button">
              <FaLink className="mr-2" /> Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Share via</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-start gap-4">
            <Button
              variant="outline"
              style={{ backgroundColor: '#25D366', color: '#fff' }}
              onClick={() => handleShare('whatsapp')}
            >
              <FaWhatsapp className="mr-2" /> WhatsApp
            </Button>
            <Button
              variant="outline"
              style={{ backgroundColor: '#1877F2', color: '#fff' }}
              onClick={() => handleShare('facebook')}
            >
              <FaFacebook className="mr-2" /> Facebook
            </Button>
            <Button
              variant="outline"
              style={{ backgroundColor: '#000', color: '#fff' }}
              onClick={() => handleShare('twitter')}
            >
              <FaXTwitter className="mr-2" /> Twitter(X)
            </Button>
            <Button
              variant="outline"
              style={{ backgroundColor: '#0088CC', color: '#fff' }}
              onClick={() => handleShare('telegram')}
            >
              <FaTelegramPlane />
              Telegram
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Referral Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Total Referrals</div>
              <div className="text-2xl font-bold">23</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Earnings</div>
              <div className="text-2xl font-bold">₦230.00</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
