'use client';

import React from 'react';
import Table from '../../../components/Tables';
import { ResolutionInsight } from '../types';

interface InsightTableProps {
  data: ResolutionInsight[];
}

/**
 * InsightTable
 *
 * Drill-down table for Insights page.
 * Shows how tickets are distributed across resolution buckets.
 */
export default function InsightTable({ data }: InsightTableProps) {
  return (
    <Table
      columns={[
        {
          key: 'bucket',
          header: 'Resolution Time',
        },
        {
          key: 'count',
          header: 'Tickets',
        },
        {
          key: 'percentage',
          header: 'Percentage',
          render: (row) => `${row.percentage}%`,
        },
      ]}
      data={data}
      emptyMessage="No resolution insights available"
      rowKey={(row) => row.bucket}
    />
  );
}
