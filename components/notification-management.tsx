"use client"

import { useState, useEffect, useCallback } from "react"
import {
  MessageSquare,
  Smartphone,
  Mail,
  RefreshCw,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  AlertTriangle,
  Send,
  X
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth, API_URL } from "@/components/auth-context"

interface NotificationLog {
  _id: string
  channel: "WhatsApp" | "SMS" | "Email"
  bookingId?: string
  patientName?: string
  packageName?: string
  recipient: string
  message: string
  type: string
  status: "sent" | "failed" | "pending"
  providerResponse?: any
  createdAt: string
}

export function NotificationManagement() {
  const { toast } = useToast()
  const { token: authContextToken } = useAuth()
  const [logs, setLogs] = useState<NotificationLog[]>([])
  const [loading, setLoading] = useState(true)
  const [channelFilter, setChannelFilter] = useState<"All" | "WhatsApp" | "SMS" | "Email">("All")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLog, setSelectedLog] = useState<NotificationLog | null>(null)

  const fetchNotificationLogs = useCallback(async () => {
    setLoading(true)
    try {
      const activeToken = authContextToken || localStorage.getItem("siddhaka_token") || localStorage.getItem("token")
      const baseUrl = API_URL || "http://localhost:5000/api"
      const res = await fetch(`${baseUrl}/bookings/notification-logs/all`, {
        headers: {
          Authorization: `Bearer ${activeToken}`
        }
      })

      if (!res.ok) {
        throw new Error("Failed to fetch notification logs")
      }

      const data = await res.json()
      setLogs(data)
    } catch (err: any) {
      console.error("Error fetching notification logs:", err)
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Failed to load notification logs"
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchNotificationLogs()
  }, [fetchNotificationLogs])

  const filteredLogs = logs.filter((log) => {
    const matchesChannel = channelFilter === "All" || log.channel === channelFilter
    const matchesStatus = statusFilter === "all" || log.status === statusFilter
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      !searchQuery ||
      log.recipient?.toLowerCase().includes(searchLower) ||
      log.patientName?.toLowerCase().includes(searchLower) ||
      log.packageName?.toLowerCase().includes(searchLower) ||
      log.message?.toLowerCase().includes(searchLower)

    return matchesChannel && matchesStatus && matchesSearch
  })

  // Statistics counts
  const totalCount = logs.length
  const whatsappCount = logs.filter((l) => l.channel === "WhatsApp").length
  const smsCount = logs.filter((l) => l.channel === "SMS").length
  const emailCount = logs.filter((l) => l.channel === "Email").length
  const failedCount = logs.filter((l) => l.status === "failed").length

  return (
    <div className="space-y-6">
      {/* Header & Refresh */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Send className="w-6 h-6 text-green-600" />
            Notification Audit Logs
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Monitor and audit all outbound SMS, WhatsApp, and Email notifications sent by the system.
          </p>
        </div>
        <button
          onClick={fetchNotificationLogs}
          disabled={loading}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl transition-all shadow-md font-medium text-sm disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh Logs
        </button>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Sent</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalCount}</p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 shadow-sm">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
          </p>
          <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mt-1">{whatsappCount}</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/50 shadow-sm">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-1">
            <Smartphone className="w-3.5 h-3.5" /> SMS
          </p>
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-300 mt-1">{smsCount}</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/50 shadow-sm">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-400 flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" /> Email
          </p>
          <p className="text-2xl font-bold text-purple-800 dark:text-purple-300 mt-1">{emailCount}</p>
        </div>
        <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-2xl border border-red-100 dark:border-red-900/50 shadow-sm col-span-2 sm:col-span-1">
          <p className="text-xs font-semibold text-red-700 dark:text-red-400 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Failed
          </p>
          <p className="text-2xl font-bold text-red-800 dark:text-red-300 mt-1">{failedCount}</p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Channel Tabs */}
        <div className="flex bg-gray-100 dark:bg-gray-700/50 p-1 rounded-xl gap-1">
          {(["All", "WhatsApp", "SMS", "Email"] as const).map((ch) => (
            <button
              key={ch}
              onClick={() => setChannelFilter(ch)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                channelFilter === ch
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {ch}
            </button>
          ))}
        </div>

        {/* Search & Status Filter */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search recipient, message, name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Statuses</option>
            <option value="sent">Sent</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Notification Logs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center gap-2">
            <RefreshCw className="w-8 h-8 animate-spin text-green-600" />
            <p className="text-sm font-medium">Loading notification logs...</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-gray-500 dark:text-gray-400">
            <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-base font-semibold text-gray-700 dark:text-gray-300">No notification logs found</p>
            <p className="text-xs text-gray-500 mt-1">Try adjusting your filters or search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600 dark:text-gray-300">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3">Channel</th>
                  <th className="px-4 py-3">Recipient & Patient</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Message Snippet</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Sent Date/Time</th>
                  <th className="px-4 py-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {filteredLogs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors">
                    {/* Channel Badge */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {log.channel === "WhatsApp" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                        </span>
                      )}
                      {log.channel === "SMS" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          <Smartphone className="w-3.5 h-3.5" /> SMS
                        </span>
                      )}
                      {log.channel === "Email" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                          <Mail className="w-3.5 h-3.5" /> Email
                        </span>
                      )}
                    </td>

                    {/* Recipient & Patient */}
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-gray-900 dark:text-white">{log.recipient}</div>
                      <div className="text-gray-400 dark:text-gray-500 text-[11px] truncate max-w-[160px]">
                        {log.patientName || "Guest Patient"}
                      </div>
                    </td>

                    {/* Notification Type */}
                    <td className="px-4 py-3.5 font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {log.type.replace(/_/g, " ")}
                    </td>

                    {/* Message Snippet */}
                    <td className="px-4 py-3.5 max-w-[260px]">
                      <p className="truncate text-gray-600 dark:text-gray-400" title={log.message}>
                        {log.message}
                      </p>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {log.status === "sent" && (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                          <CheckCircle className="w-3.5 h-3.5" /> Sent
                        </span>
                      )}
                      {log.status === "failed" && (
                        <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold text-xs">
                          <XCircle className="w-3.5 h-3.5" /> Failed
                        </span>
                      )}
                      {log.status === "pending" && (
                        <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold text-xs">
                          <Clock className="w-3.5 h-3.5" /> Pending
                        </span>
                      )}
                    </td>

                    {/* Sent Date/Time */}
                    <td className="px-4 py-3.5 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {new Date(log.createdAt).toLocaleString([], {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors font-medium text-xs"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Payload
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Notification Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[200]">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 dark:border-gray-700 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                {selectedLog.channel === "WhatsApp" && <MessageSquare className="w-5 h-5 text-emerald-600" />}
                {selectedLog.channel === "SMS" && <Smartphone className="w-5 h-5 text-blue-600" />}
                {selectedLog.channel === "Email" && <Mail className="w-5 h-5 text-purple-600" />}
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {selectedLog.channel} Notification Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block font-medium">Recipient</span>
                <span className="font-semibold text-gray-900 dark:text-white">{selectedLog.recipient}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Patient Name</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {selectedLog.patientName || "Guest"}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Package / Service</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {selectedLog.packageName || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Status</span>
                <span
                  className={`font-bold capitalize ${
                    selectedLog.status === "sent"
                      ? "text-emerald-600"
                      : selectedLog.status === "failed"
                      ? "text-red-600"
                      : "text-amber-600"
                  }`}
                >
                  {selectedLog.status}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">
                Full Message Text
              </span>
              <div className="bg-gray-50 dark:bg-gray-900/60 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-xs text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono">
                {selectedLog.message}
              </div>
            </div>

            {selectedLog.providerResponse && (
              <div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">
                  Gateway Provider Response / Payload
                </span>
                <pre className="bg-gray-950 text-emerald-400 p-4 rounded-xl text-[11px] overflow-x-auto font-mono max-h-48">
                  {JSON.stringify(selectedLog.providerResponse, null, 2)}
                </pre>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
