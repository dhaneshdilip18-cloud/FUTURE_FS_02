import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiBell, FiMoon, FiMail, FiVolume2, FiSave, FiCheck } from 'react-icons/fi';
import { Settings } from '../utils/localStorage';

interface SettingsProps {
  settings: Settings;
  onSaveSettings: (settings: Settings) => void;
}

export const SettingsPage = ({ settings: initialSettings, onSaveSettings }: SettingsProps) => {
  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved] = useState(false);

  const handleToggle = (key: keyof Settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    onSaveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleItems = [
    { key: 'notifications' as const, label: 'Push Notifications', description: 'Receive push notifications for important updates', icon: FiBell },
    { key: 'emailAlerts' as const, label: 'Email Alerts', description: 'Get email notifications for lead activities', icon: FiMail },
    { key: 'soundEnabled' as const, label: 'Sound Effects', description: 'Play sound for notifications and alerts', icon: FiVolume2 },
    { key: 'autoSave' as const, label: 'Auto Save', description: 'Automatically save changes while editing', icon: FiSave },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Profile Section */}
      <div
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <FiUser className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text">Profile Settings</h2>
            <p className="text-sm text-secondary">Manage your account preferences</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            AU
          </div>
          <div className="flex-1">
            <p className="text-text font-medium text-lg">Admin User</p>
            <p className="text-secondary">admin@crm.com</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-3 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-secondary text-sm hover:text-text hover:bg-white/10 transition-all"
            >
              Change Avatar
            </motion.button>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
            <FiBell className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text">Notification Settings</h2>
            <p className="text-sm text-secondary">Configure how you receive alerts</p>
          </div>
        </div>

        <div className="space-y-4">
          {toggleItems.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="text-text font-medium">{item.label}</p>
                  <p className="text-secondary text-sm">{item.description}</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle(item.key)}
                className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                  settings[item.key] ? 'bg-primary' : 'bg-white/10'
                }`}
              >
                <motion.div
                  initial={false}
                  animate={{ x: settings[item.key] ? 24 : 4 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg"
                />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Theme Section */}
      <div
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
            <FiMoon className="w-5 h-5 text-success" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text">Theme Preferences</h2>
            <p className="text-sm text-secondary">Customize your visual experience</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
              <FiMoon className="w-4 h-4 text-secondary" />
            </div>
            <div>
              <p className="text-text font-medium">Dark Mode</p>
              <p className="text-secondary text-sm">Use dark theme across the application</p>
            </div>
          </div>
          <div className="px-4 py-2 rounded-lg bg-primary/20 text-primary text-sm font-medium">
            Active
          </div>
        </div>
      </div>

      {/* Save Button */}
      <motion.button
        onClick={handleSave}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-4 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
          saved
            ? 'bg-success shadow-success/25'
            : 'bg-gradient-to-r from-primary to-accent shadow-primary/25 hover:shadow-primary/40'
        }`}
      >
        {saved ? (
          <>
            <FiCheck className="w-5 h-5" />
            Saved Successfully!
          </>
        ) : (
          <>
            <FiSave className="w-5 h-5" />
            Save Settings
          </>
        )}
      </motion.button>
    </motion.div>
  );
};
