"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Sidebar, PartnerNavTab, MasterNavTab } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { HomeView } from "@/components/HomeView";
import { DealsView } from "@/components/DealsView";
import { CommissionsView } from "@/components/CommissionsView";
import { ShareView } from "@/components/ShareView";
import { HeroPage } from "@/components/HeroPage";
import { ApplicationForm } from "@/components/ApplicationForm";
import { SettingsView } from "@/components/SettingsView";
import { MasterOverviewView } from "@/components/MasterOverviewView";
import { MasterPartnersView } from "@/components/MasterPartnersView";
import { MasterPipelineView } from "@/components/MasterPipelineView";
import { MasterCommissionsView } from "@/components/MasterCommissionsView";
import { MasterReportsView } from "@/components/MasterReportsView";
import { ShareReferralModal } from "@/components/ShareReferralModal";
import { DealDetailModal } from "@/components/DealDetailModal";
import { AddPartnerModal } from "@/components/AddPartnerModal";
import { LoginView } from "@/components/LoginView";
import { ContactWidget } from "@/components/ContactWidget";
import { BarChart3, Briefcase, Check, Home, Percent, QrCode, Users, GitBranch, X } from "lucide-react";
import { PartnerProfile, CommissionItem } from "@/data/mockData";
import { PartnerDeal } from "@/data/netlifyData";
import {
  apiRequest,
  ApiCommission,
  AuthUser,
  clearAccessToken,
  DashboardData,
  Deal,
  getAccessToken,
  getCurrentUser,
  MasterOverviewData,
  MasterPreferences,
  MasterPipelineDeal,
  MasterReportData,
  PartnerDirectoryItem,
  PipelineStageCounts,
} from "@/lib/api";

function settingsPayload(partner: PartnerProfile) {
  return {
    name: partner.name,
    contactEmail: partner.contactEmail,
    phone: partner.phone,
    bankAccount: partner.bankAccount,
    bsb: partner.bsb,
    abn: partner.abn,
    notificationsEnabled: partner.notificationsEnabled,
    settlementAlerts: partner.settlementAlerts,
    marketingEmails: partner.marketingEmails,
  };
}

export default function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [perspective, setPerspective] = useState<"partner" | "master">("partner");
  const [currentPartnerTab, setCurrentPartnerTab] = useState<PartnerNavTab>("home");
  const [currentMasterTab, setCurrentMasterTab] = useState<MasterNavTab>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeFlow, setActiveFlow] = useState<"dashboard" | "hero-page" | "apply-form">("dashboard");
  const [toastMessage, setToastMessage] = useState<{ title: string; subtitle: string } | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [partner, setPartner] = useState<PartnerProfile | null>(null);
  const [dashboardStats, setDashboardStats] = useState<DashboardData["stats"] | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [partnerDeals, setPartnerDeals] = useState<PartnerDeal[]>([]);
  const [commissions, setCommissions] = useState<CommissionItem[]>([]);
  const [masterCommissions, setMasterCommissions] = useState<ApiCommission[]>([]);
  const [masterOverview, setMasterOverview] = useState<MasterOverviewData | null>(null);
  const [masterPipeline, setMasterPipeline] = useState<MasterPipelineDeal[]>([]);
  const [pipelineStageCounts, setPipelineStageCounts] = useState<PipelineStageCounts>({
    leadReceived: 0,
    customerInvited: 0,
    applicationSubmitted: 0,
    waitingOnCustomer: 0,
  });
  const [pipelineSearchTerm, setPipelineSearchTerm] = useState("");
  const [initialDealsStageFilter, setInitialDealsStageFilter] = useState("All stages");
  const [partners, setPartners] = useState<PartnerDirectoryItem[]>([]);
  const [masterReports, setMasterReports] = useState<MasterReportData | null>(null);
  const [masterPreferences, setMasterPreferences] = useState<MasterPreferences | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const canSwitchPerspective = user?.role === "master";

  useEffect(() => {
    void Promise.resolve().then(() => {
      const token = getAccessToken();
      const savedUser = getCurrentUser();
      if (token && savedUser) {
        setUser(savedUser);
        setPerspective(savedUser.role);
      } else {
        clearAccessToken();
      }
      setAuthReady(true);
    });
  }, []);

  const loadData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setApiError("");
    try {
      const [dashboard, allDeals, commissionRows] = await Promise.all([
        apiRequest<DashboardData>("/portal/dashboard"),
        apiRequest<PartnerDeal[]>("/portal/deals"),
        apiRequest<ApiCommission[]>("/portal/commissions"),
      ]);
      setPartner(dashboard.partner);
      setDashboardStats(dashboard.stats);
      setDeals(dashboard.deals);
      setPartnerDeals(allDeals);
      setCommissions(commissionRows);
      if (user.role === "master") {
        const [overview, pipeline, stageCounts, partnerRows, reports, preferences] = await Promise.all([
          apiRequest<MasterOverviewData>("/portal/master/overview"),
          apiRequest<MasterPipelineDeal[]>("/portal/master/pipeline"),
          apiRequest<PipelineStageCounts>("/portal/master/pipeline-stages"),
          apiRequest<PartnerDirectoryItem[]>("/portal/master/partners"),
          apiRequest<MasterReportData>("/portal/master/reports"),
          apiRequest<MasterPreferences>("/portal/master/preferences"),
        ]);
        setMasterOverview(overview);
        setMasterPipeline(pipeline);
        setPipelineStageCounts(stageCounts);
        setPartners(partnerRows);
        setMasterReports(reports);
        setMasterPreferences(preferences);
        setMasterCommissions(commissionRows);
      }
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Could not load portal data.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authReady && user) void Promise.resolve().then(loadData);
  }, [authReady, user, loadData]);

  const notify = (title: string, subtitle: string) => {
    setToastMessage({ title, subtitle });
    window.setTimeout(() => setToastMessage(null), 4000);
  };

  const logout = () => {
    clearAccessToken();
    setUser(null);
    setPartner(null);
    setDashboardStats(null);
    setDeals([]);
    setPartnerDeals([]);
    setCommissions([]);
    setMasterOverview(null);
    setMasterPipeline([]);
    setPartners([]);
    setMasterReports(null);
    setMasterPreferences(null);
    setApiError("");
  };

  const togglePerspective = () => {
    if (!canSwitchPerspective) return;
    const next = perspective === "partner" ? "master" : "partner";
    setPerspective(next);
    notify(
      next === "master" ? "Kredo Master view" : "Partner Workspace view",
      next === "master" ? "You can now see every partner book." : `Viewing as ${partner?.name || "partner"}.`,
    );
  };

  const selectDeal = async (dealId: string) => {
    setApiError("");
    try {
      const detail = await apiRequest<Deal>(`/portal/deals/${encodeURIComponent(dealId)}`);
      setSelectedDeal(detail);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Could not load deal.");
    }
  };

  const handleUpdateDealStatus = async (dealId: string, status: Deal["status"], lostReason?: string) => {
    setApiError("");
    try {
      const updated = await apiRequest<Deal>(`/portal/deals/${encodeURIComponent(dealId)}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status, lostReason }),
      });
      setDeals((current) => current.map((deal) => (deal.id === dealId ? updated : deal)));
      setPartnerDeals((current) =>
        current.map((deal) => (deal.id === dealId ? { ...deal, stage: status, lostReason } : deal)),
      );
      setSelectedDeal(updated);
      void loadData();
      notify("Deal updated", `${updated.name} moved to ${status}`);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Could not update deal status.");
    }
  };

  const handleAddDiaryNote = async (
    dealId: string,
    note: { content: string; nextSteps?: string; isInternal?: boolean },
  ) => {
    setApiError("");
    try {
      const updated = await apiRequest<Deal>(`/portal/deals/${encodeURIComponent(dealId)}/notes`, {
        method: "POST",
        body: JSON.stringify(note),
      });
      setSelectedDeal(updated);
      void loadData();
      notify("Diary note added", "New note saved to audit trail.");
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Could not save diary note.");
    }
  };

  const handleUpdateCommission = async (
    dealId: string,
    updates: { status?: "Confirmed" | "Paid" | "Processing"; commissionAmount?: string },
  ) => {
    setApiError("");
    try {
      await apiRequest(`/portal/commissions/${encodeURIComponent(dealId)}`, {
        method: "PATCH",
        body: JSON.stringify(updates),
      });
      await loadData();
      notify("Commission adjusted", `Updated deal commission record.`);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Could not update commission.");
    }
  };

  if (!authReady) {
    return <main className="min-h-screen grid place-items-center text-sm text-slate-500">Loading Kredo...</main>;
  }

  if (!user) {
    return (
      <LoginView
        onLogin={(authenticatedUser) => {
          setUser(authenticatedUser);
          setPerspective(authenticatedUser.role);
        }}
      />
    );
  }

  if (activeFlow === "hero-page") {
    return (
      <HeroPage
        onBackToDemo={() => setActiveFlow("dashboard")}
        onApplyNow={() => setActiveFlow("apply-form")}
        referralCode={partner?.code || user.partnerCode || "SPUD"}
      />
    );
  }

  if (activeFlow === "apply-form") {
    return (
      <ApplicationForm
        onBackToDemo={() => setActiveFlow("dashboard")}
        referralCode={partner?.code || "SPUD"}
        onSubmitApplication={async (application) => {
          await apiRequest(
            "/portal/applications",
            {
              method: "POST",
              body: JSON.stringify(application),
            },
            false,
          );
          void loadData();
        }}
      />
    );
  }

  if (!partner) {
    return (
      <main className="min-h-screen grid place-items-center p-6 text-center">
        <div>
          {loading ? (
            <p className="text-sm text-slate-500">Loading your workspace...</p>
          ) : (
            <>
              <p role="alert" className="text-sm text-rose-700">
                {apiError || "Partner profile could not be loaded."}
              </p>
              <button
                onClick={() => void loadData()}
                className="mt-3 rounded-lg bg-[#0a1926] px-4 py-2 text-sm font-semibold text-white"
              >
                Try again
              </button>
            </>
          )}
          <button onClick={logout} className="mt-3 block mx-auto text-xs text-slate-500 underline">
            Sign out
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fa] flex flex-col font-sans relative">
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-start gap-3 bg-[#062615] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#0d4f2c] max-w-sm animate-in slide-in-from-top-2 duration-200">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center shrink-0 mt-0.5">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-white leading-tight">{toastMessage.title}</div>
            <div className="text-[11px] text-emerald-300 mt-0.5">{toastMessage.subtitle}</div>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-400 hover:text-white p-0.5">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <Sidebar
        perspective={perspective}
        currentPartnerTab={currentPartnerTab}
        currentMasterTab={currentMasterTab}
        onSelectPartnerTab={(tab) => {
          if (tab === "hero") setActiveFlow("hero-page");
          else setCurrentPartnerTab(tab);
        }}
        onSelectMasterTab={(tab) => {
          if (tab === "hero") setActiveFlow("hero-page");
          else setCurrentMasterTab(tab);
        }}
        onTogglePerspective={togglePerspective}
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        partnerName={partner.name}
        partnerCode={partner.code}
        canSwitchPerspective={canSwitchPerspective}
      />

      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        <Header
          partnerName={partner.name}
          perspective={perspective}
          onTogglePerspective={togglePerspective}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onLogout={logout}
          canSwitchPerspective={canSwitchPerspective}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-28 lg:pb-8">
          {apiError && (
            <div
              role="alert"
              className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700"
            >
              <span>{apiError}</span>
              <button onClick={() => void loadData()} className="font-bold underline">
                Retry
              </button>
            </div>
          )}
          {loading && <p className="mb-4 text-xs text-slate-500">Refreshing workspace data...</p>}

          {perspective === "partner" && (
            <>
              {currentPartnerTab === "home" && (
                <HomeView
                  deals={deals}
                  stats={
                    dashboardStats || {
                      referredThisMonth: 0,
                      inFlight: 0,
                      settled: 0,
                      closedLost: 0,
                      totalCommissionsEarned: "$0",
                      estimatedCommission: "$0",
                    }
                  }
                  onOpenShareModal={() => setIsShareModalOpen(true)}
                  onSelectDeal={setSelectedDeal}
                  onNavigateToDeals={(filter) => {
                    if (filter) setInitialDealsStageFilter(filter);
                    setCurrentPartnerTab("deals");
                  }}
                  onNavigateToCommissions={() => setCurrentPartnerTab("commissions")}
                  onNavigateToShare={() => setCurrentPartnerTab("share")}
                  partnerCode={partner.code}
                  referralLink={partner.referralLink}
                />
              )}
              {currentPartnerTab === "deals" && (
                <DealsView
                  deals={partnerDeals}
                  initialStageFilter={initialDealsStageFilter}
                  onSelectDeal={(deal) => void selectDeal(deal.id)}
                />
              )}
              {currentPartnerTab === "commissions" && <CommissionsView commissions={commissions} />}
              {currentPartnerTab === "share" && (
                <ShareView
                  onOpenHeroDemo={() => setActiveFlow("hero-page")}
                  referralCode={partner.code}
                  referralLink={partner.referralLink}
                  dailyDigest={partner.notificationsEnabled}
                  onToggleDailyDigest={async (enabled) => {
                    const saved = await apiRequest<PartnerProfile>("/portal/settings", {
                      method: "PATCH",
                      body: JSON.stringify(settingsPayload({ ...partner, notificationsEnabled: enabled })),
                    });
                    setPartner(saved);
                  }}
                />
              )}
              {currentPartnerTab === "settings" && (
                <SettingsView
                  partner={partner}
                  onUpdatePartner={async (updated) => {
                    const saved = await apiRequest<PartnerProfile>("/portal/settings", {
                      method: "PATCH",
                      body: JSON.stringify(settingsPayload(updated)),
                    });
                    setPartner(saved);
                  }}
                  onUpdatePassword={async (currentPassword, newPassword) => {
                    await apiRequest("/auth/update-password", {
                      method: "POST",
                      body: JSON.stringify({ currentPassword, newPassword }),
                    });
                  }}
                />
              )}
            </>
          )}

          {perspective === "master" && (
            <>
              {currentMasterTab === "overview" && masterOverview && (
                <MasterOverviewView
                  data={masterOverview}
                  onNavigateToPartners={() => setCurrentMasterTab("partners")}
                  onNavigateToPipeline={(filter) => {
                    if (filter) setPipelineSearchTerm(filter === "Closed Lost" ? "Closed Lost" : "");
                    setCurrentMasterTab("pipeline");
                  }}
                  onNavigateToReports={() => setCurrentMasterTab("reports")}
                  onNavigateToCommissions={() => setCurrentMasterTab("commissions")}
                  onViewPartnerBook={(partnerCode) => {
                    setPipelineSearchTerm(partnerCode);
                    setCurrentMasterTab("pipeline");
                  }}
                />
              )}
              {currentMasterTab === "partners" && (
                <MasterPartnersView
                  partners={partners}
                  onOpenAddPartner={() => setIsAddPartnerOpen(true)}
                  onViewPartnerBook={(partnerCode) => {
                    setPipelineSearchTerm(partnerCode);
                    setCurrentMasterTab("pipeline");
                  }}
                />
              )}
              {currentMasterTab === "pipeline" && (
                <MasterPipelineView
                  deals={masterPipeline}
                  stageCounts={pipelineStageCounts}
                  searchTerm={pipelineSearchTerm}
                  onSearchChange={setPipelineSearchTerm}
                  onSelectDeal={(dealId) => void selectDeal(dealId)}
                />
              )}
              {currentMasterTab === "commissions" && (
                <MasterCommissionsView
                  commissions={masterCommissions}
                  onUpdateCommission={handleUpdateCommission}
                />
              )}
              {currentMasterTab === "reports" && masterReports && masterPreferences && (
                <MasterReportsView
                  data={masterReports}
                  preferences={masterPreferences}
                  onToggleWeeklyReports={async (enabled) => {
                    const saved = await apiRequest<MasterPreferences>("/portal/master/preferences", {
                      method: "PATCH",
                      body: JSON.stringify({ weeklyReportsEnabled: enabled }),
                    });
                    setMasterPreferences(saved);
                  }}
                />
              )}
              {currentMasterTab === "settings" && (
                <SettingsView
                  partner={partner}
                  onUpdatePartner={async (updated) => {
                    const saved = await apiRequest<PartnerProfile>("/portal/settings", {
                      method: "PATCH",
                      body: JSON.stringify(settingsPayload(updated)),
                    });
                    setPartner(saved);
                  }}
                  onUpdatePassword={async (currentPassword, newPassword) => {
                    await apiRequest("/auth/update-password", {
                      method: "POST",
                      body: JSON.stringify({ currentPassword, newPassword }),
                    });
                  }}
                />
              )}
            </>
          )}
        </main>
        <nav
          aria-label="Primary navigation"
          className="mobile-bottom-nav fixed inset-x-3 bottom-3 z-30 grid grid-cols-4 rounded-2xl border border-slate-200/80 bg-white/95 p-1.5 shadow-xl backdrop-blur-lg lg:hidden"
        >
          {(perspective === "partner"
            ? [
                { label: "Home", icon: Home, active: currentPartnerTab === "home", select: () => setCurrentPartnerTab("home") },
                { label: "Deals", icon: Briefcase, active: currentPartnerTab === "deals", select: () => setCurrentPartnerTab("deals") },
                {
                  label: "Commissions",
                  icon: Percent,
                  active: currentPartnerTab === "commissions",
                  select: () => setCurrentPartnerTab("commissions"),
                },
                { label: "Share", icon: QrCode, active: currentPartnerTab === "share", select: () => setCurrentPartnerTab("share") },
              ]
            : [
                { label: "Overview", icon: Home, active: currentMasterTab === "overview", select: () => setCurrentMasterTab("overview") },
                { label: "Partners", icon: Users, active: currentMasterTab === "partners", select: () => setCurrentMasterTab("partners") },
                { label: "Pipeline", icon: GitBranch, active: currentMasterTab === "pipeline", select: () => setCurrentMasterTab("pipeline") },
                { label: "Reports", icon: BarChart3, active: currentMasterTab === "reports", select: () => setCurrentMasterTab("reports") },
              ]
          ).map(({ label, icon: Icon, active, select }) => (
            <button
              key={label}
              type="button"
              onClick={select}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[clamp(0.5625rem,2.5vw,0.875rem)] font-semibold transition-colors ${
                active ? "bg-[#0a1926] text-white" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      <ShareReferralModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        referralCode={partner.code}
        referralLink={partner.referralLink}
        onCreateReferral={async (referral) => {
          const created = await apiRequest<Deal>("/portal/deals/direct", {
            method: "POST",
            body: JSON.stringify(referral),
          });
          setDeals((current) => [created, ...current]);
          await loadData();
          return created;
        }}
      />
      <DealDetailModal
        deal={selectedDeal}
        isOpen={Boolean(selectedDeal)}
        onClose={() => setSelectedDeal(null)}
        onUpdateStatus={handleUpdateDealStatus}
        onAddNote={handleAddDiaryNote}
        canEdit={true}
      />
      <AddPartnerModal
        isOpen={isAddPartnerOpen}
        onClose={() => setIsAddPartnerOpen(false)}
        onAddPartner={async (newPartner) => {
          const created = await apiRequest<{ name: string; code: string }>("/portal/master/partners", {
            method: "POST",
            body: JSON.stringify({
              tradingName: newPartner.tradingName,
              primaryContact: newPartner.primaryContact,
              email: newPartner.email,
              partnerType: newPartner.partnerType,
              uniqueCode: newPartner.uniqueCode,
            }),
          });
          const updatedDirectory = await apiRequest<PartnerDirectoryItem[]>("/portal/master/partners");
          setPartners(updatedDirectory);
          notify(`Partner ${created.name} created`, `Assigned code: ${created.code}`);
        }}
      />

      {/* Floating Talk to Someone widget with 1300 4 KREDO (Section 3.5) */}
      <ContactWidget />
    </div>
  );
}
