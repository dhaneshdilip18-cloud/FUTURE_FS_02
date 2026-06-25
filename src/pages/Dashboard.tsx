import { motion } from 'framer-motion';
import { FiUsers, FiUserPlus, FiPhone, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import { StatsCard } from '../components/StatsCard';
import { Lead } from '../utils/localStorage';

interface DashboardProps {
  leads: Lead[];
}

export const Dashboard = ({ leads }: DashboardProps) => {
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const contactedLeads = leads.filter((l) => l.status === 'Contacted').length;
  const convertedLeads = leads.filter((l) => l.status === 'Converted').length;

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Leads"
          value={totalLeads}
          icon={FiUsers}
          color="primary"
          trend={{ value: 12, isPositive: true }}
          delay={0.1}
        />
        <StatsCard
          title="New Leads"
          value={newLeads}
          icon={FiUserPlus}
          color="accent"
          trend={{ value: 8, isPositive: true }}
          delay={0.2}
        />
        <StatsCard
          title="Contacted"
          value={contactedLeads}
          icon={FiPhone}
          color="warning"
          trend={{ value: 5, isPositive: true }}
          delay={0.3}
        />
        <StatsCard
          title="Converted"
          value={convertedLeads}
          icon={FiCheckCircle}
          color="success"
          trend={{ value: 15, isPositive: true }}
          delay={0.4}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          }}
        >
          <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
            <FiTrendingUp className="text-primary" />
            Recent Leads
          </h2>

          {recentLeads.length === 0 ? (
            <div className="text-center py-8">
              <FiUsers className="w-12 h-12 text-secondary/50 mx-auto mb-3" />
              <p className="text-secondary">No leads yet</p>
              <p className="text-secondary/70 text-sm">Add your first lead to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead, index) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-medium text-sm">
                      {lead.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-text font-medium">{lead.name}</p>
                      <p className="text-secondary text-sm">{lead.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lead.status === 'Converted'
                          ? 'bg-success/20 text-success'
                          : lead.status === 'New'
                          ? 'bg-primary/20 text-primary'
                          : lead.status === 'Lost'
                          ? 'bg-error/20 text-error'
                          : 'bg-warning/20 text-warning'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          }}
        >
          <h2 className="text-lg font-semibold text-text mb-4">Lead Sources</h2>

          <div className="space-y-4">
            {['Website', 'Facebook', 'Instagram', 'LinkedIn', 'Referral', 'Google Ads'].map((source, index) => {
              const count = leads.filter((l) => l.source === source).length;
              const percentage = leads.length > 0 ? (count / leads.length) * 100 : 0;

              return (
                <div key={source}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-secondary text-sm">{source}</span>
                    <span className="text-text text-sm">{count}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
