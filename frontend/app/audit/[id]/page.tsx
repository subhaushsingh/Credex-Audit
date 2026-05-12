import AuditResults from '@/components/AuditResults';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const response = await fetch(`${apiUrl}/api/v1/audit/${id}`);
  if (!response.ok) return { title: 'Credex Audit' };

  const { data } = await response.json();
  const savings = data?.credexOffer?.totalPotentialSavings || 0;

  return {
    title: `AI Spend Audit | Found $${savings}/mo in savings`,
    description: `An automated audit of AI infrastructure spend found $${savings} in monthly savings.`
  };
}

export default async function PublicAuditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  
  // 2. Added /v1 to the path
  const response = await fetch(`${apiUrl}/api/v1/audit/${id}`, { cache: 'no-store' });
  
  if (!response.ok) {
    return <div className="p-8 text-center text-white">Audit not found.</div>;
  }

  const result = await response.json();

  return (
    <main className="min-h-screen bg-slate-950 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-2xl font-bold text-white">Credex Audit Result</h1>
      </div>
      <AuditResults data={result} auditId={id} isPublicView={true} />
    </main>
  );
}