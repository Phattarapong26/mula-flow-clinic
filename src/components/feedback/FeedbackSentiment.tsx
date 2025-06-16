
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile, Frown, Meh, TrendingUp, MessageCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const sentimentData = [
  { period: 'ม.ค.', positive: 78, neutral: 15, negative: 7 },
  { period: 'ก.พ.', positive: 82, neutral: 12, negative: 6 },
  { period: 'มี.ค.', positive: 85, neutral: 10, negative: 5 },
  { period: 'เม.ย.', positive: 80, neutral: 14, negative: 6 },
  { period: 'พ.ค.', positive: 87, neutral: 9, negative: 4 },
  { period: 'มิ.ย.', positive: 89, neutral: 8, negative: 3 }
];

const sentimentByService = [
  { service: 'Laser Hair Removal', positive: 92, neutral: 6, negative: 2 },
  { service: 'Facial Treatment', positive: 88, neutral: 9, negative: 3 },
  { service: 'Botox Injection', positive: 94, neutral: 4, negative: 2 },
  { service: 'Chemical Peeling', positive: 85, neutral: 11, negative: 4 },
  { service: 'Acne Treatment', positive: 87, neutral: 8, negative: 5 }
];

const sentimentByBranch = [
  { branch: 'สาขาสยาม', positive: 91, neutral: 7, negative: 2 },
  { branch: 'สาขาทองหล่อ', positive: 89, neutral: 8, negative: 3 },
  { branch: 'สาขาอารีย์', positive: 86, neutral: 10, negative: 4 },
  { branch: 'สาขาเซ็นทรัล', positive: 83, neutral: 12, negative: 5 }
];

const keywordAnalysis = [
  { category: 'Positive Keywords', keywords: [
    { word: 'ประทับใจ', count: 156, sentiment: 'positive' },
    { word: 'คุ้มค่า', count: 134, sentiment: 'positive' },
    { word: 'แนะนำ', count: 112, sentiment: 'positive' },
    { word: 'สะอาด', count: 98, sentiment: 'positive' },
    { word: 'เป็นมืออาชีพ', count: 89, sentiment: 'positive' }
  ]},
  { category: 'Negative Keywords', keywords: [
    { word: 'รอนาน', count: 45, sentiment: 'negative' },
    { word: 'แพง', count: 32, sentiment: 'negative' },
    { word: 'ไม่ชัดเจน', count: 23, sentiment: 'negative' },
    { word: 'จองยาก', count: 18, sentiment: 'negative' },
    { word: 'คับแคบ', count: 15, sentiment: 'negative' }
  ]}
];

const emotionAnalysis = [
  { emotion: 'ความพึงพอใจ', percentage: 89, color: '#10b981', icon: Smile },
  { emotion: 'เฉยๆ', percentage: 8, color: '#6b7280', icon: Meh },
  { emotion: 'ไม่พอใจ', percentage: 3, color: '#ef4444', icon: Frown }
];

const FeedbackSentiment = () => {
  const latestSentiment = sentimentData[sentimentData.length - 1];
  const sentimentImprovement = latestSentiment.positive - sentimentData[0].positive;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sentiment Analysis</h1>
        <p className="text-gray-600 mt-1">วิเคราะห์อารมณ์และความรู้สึกจากรีวิวลูกค้า</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Positive</p>
                <p className="text-2xl font-bold">{latestSentiment.positive}%</p>
                <p className="text-green-100 text-xs">+{sentimentImprovement}% vs ม.ค.</p>
              </div>
              <Smile className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-gray-500 to-gray-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-100">Neutral</p>
                <p className="text-2xl font-bold">{latestSentiment.neutral}%</p>
                <p className="text-gray-100 text-xs">ปกติ</p>
              </div>
              <Meh className="h-8 w-8 text-gray-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Negative</p>
                <p className="text-2xl font-bold">{latestSentiment.negative}%</p>
                <p className="text-red-100 text-xs">ลดลง</p>
              </div>
              <Frown className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">แนวโน้ม</p>
                <p className="text-2xl font-bold">↗ ดีขึ้น</p>
                <p className="text-blue-100 text-xs">sentiment</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>แนวโน้ม Sentiment รายเดือน</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sentimentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={3} name="Positive" />
                <Line type="monotone" dataKey="neutral" stroke="#6b7280" strokeWidth={2} name="Neutral" />
                <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} name="Negative" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sentiment ตามบริการ</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sentimentByService} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="service" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="positive" stackId="a" fill="#10b981" name="Positive" />
                <Bar dataKey="neutral" stackId="a" fill="#6b7280" name="Neutral" />
                <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Negative" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sentiment สาขา</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sentimentByBranch.map((branch, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{branch.branch}</h3>
                    <div className="text-sm text-green-600 font-bold">{branch.positive}%</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${branch.positive}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>คำสำคัญที่พบบ่อย</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {keywordAnalysis.map((category, index) => (
                <div key={index}>
                  <h3 className={`font-medium mb-3 ${
                    category.category.includes('Positive') ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {category.category}
                  </h3>
                  <div className="space-y-2">
                    {category.keywords.map((keyword, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 border rounded">
                        <span className="font-medium">{keyword.word}</span>
                        <span className={`px-2 py-1 rounded text-sm ${
                          keyword.sentiment === 'positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {keyword.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>การกระจายของอารมณ์</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emotionAnalysis.map((emotion, index) => {
              const IconComponent = emotion.icon;
              return (
                <div key={index} className="text-center p-6 border rounded-lg">
                  <IconComponent className="h-12 w-12 mx-auto mb-4" style={{ color: emotion.color }} />
                  <h3 className="font-medium text-lg mb-2">{emotion.emotion}</h3>
                  <div className="text-3xl font-bold mb-2" style={{ color: emotion.color }}>
                    {emotion.percentage}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${emotion.percentage}%`,
                        backgroundColor: emotion.color 
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackSentiment;
