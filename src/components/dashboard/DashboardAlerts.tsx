import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, AlertCircle, CheckCircle, Clock, TrendingDown, TrendingUp, Download, Bell, Settings } from 'lucide-react';
import { dashboardService, alertsSchema } from '@/services/dashboard';
import { useToast } from '@/components/ui/use-toast';
import DOMPurify from 'dompurify';

type AlertsData = typeof alertsSchema._type;

export function DashboardAlerts() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [alerts, setAlerts] = useState<AlertsData | null>(null);

  useEffect(() => {
    const fetchAlertsData = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getAlerts();
        setAlerts(data);
      } catch (error) {
        console.error('Error fetching alerts data:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch alerts data. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAlertsData();
  }, [toast]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!alerts) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-muted-foreground">No alerts data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const filteredAlerts = alerts.alerts.filter(alert => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'critical') return alert.type === 'critical';
    if (selectedFilter === 'warning') return alert.type === 'warning';
    if (selectedFilter === 'info') return alert.type === 'info';
    return true;
  }).filter(alert => {
    if (selectedCategory === 'all') return true;
    return alert.category === selectedCategory;
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'info': return <CheckCircle className="h-5 w-5 text-blue-600" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alert System</h1>
          <p className="text-gray-600 mt-1">Monitor and track important issues</p>
        </div>
        <div className="flex space-x-3">
          <select 
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">All</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">All Categories</option>
            {alerts.categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {alerts.metrics.map((metric, index) => (
          <Card key={index} className="bg-gradient-to-r from-gray-50 to-gray-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{metric.name}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <div className="flex items-center">
                  {metric.trend === 'up' ? 
                    <TrendingUp className="h-6 w-6 text-red-500" /> : 
                    <TrendingDown className="h-6 w-6 text-green-500" />
                  }
                  <span className={`ml-1 text-sm ${metric.trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Critical Alerts Section */}
      {alerts.criticalAlerts.length > 0 && (
        <Card className="border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Critical Alerts ({alerts.criticalAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {alerts.criticalAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 border-b last:border-b-0 ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                        <p className="text-sm text-gray-600 mt-1" 
                           dangerouslySetInnerHTML={{ 
                             __html: DOMPurify.sanitize(alert.description) 
                           }} 
                        />
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {alert.timestamp}
                          </span>
                          <span className="px-2 py-1 bg-gray-200 rounded">{alert.category}</span>
                          <span className={`px-2 py-1 rounded ${
                            alert.impact === 'high' ? 'bg-red-200 text-red-800' :
                            alert.impact === 'medium' ? 'bg-orange-200 text-orange-800' :
                            'bg-yellow-200 text-yellow-800'
                          }`}>
                            {alert.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {alert.actionRequired && (
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Take Action
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            All Alerts ({filteredAlerts.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div>
                      <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                      <p className="text-sm text-gray-600 mt-1" 
                         dangerouslySetInnerHTML={{ 
                           __html: DOMPurify.sanitize(alert.description) 
                         }} 
                      />
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {alert.timestamp}
                        </span>
                        <span className="px-2 py-1 bg-gray-200 rounded">{alert.category}</span>
                        <span className={`px-2 py-1 rounded ${
                          alert.type === 'critical' ? 'bg-red-100 text-red-800' :
                          alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {alert.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {!alert.resolved && (
                      <Button size="sm" variant="outline">
                        Mark as Resolved
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert Categories & History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Alerts by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.categories.map((category) => (
                <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-gray-600">
                      {category.critical > 0 && (
                        <span className="text-red-600">{category.critical} critical, </span>
                      )}
                      Total {category.count} items
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{category.count}</div>
                    {category.critical > 0 && (
                      <div className="text-sm text-red-600 font-medium">
                        {category.critical} critical
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alert History (Last 5 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.history.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{day.date}</h3>
                    <p className="text-sm text-gray-600">
                      Resolved {day.resolved}/{day.total} items
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{day.total}</div>
                    {day.critical > 0 && (
                      <div className="text-sm text-red-600">
                        {day.critical} critical
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alerts.quickActions.map((action, index) => (
              <div key={index} className={`p-4 ${action.bgColor} border ${action.borderColor} rounded-lg`}>
                <h4 className={`font-semibold ${action.textColor} mb-2`}>{action.title}</h4>
                <ul className={`text-sm ${action.textColor} space-y-1`}>
                  {action.items.map((item, itemIndex) => (
                    <li key={itemIndex}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
