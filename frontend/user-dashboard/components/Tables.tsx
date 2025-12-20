'use client';

import React from 'react';

export interface Column<T> {
  key: keyof T;
  header: string;
  width?: string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  rowKey?: (row: T, index: number) => string;
}

/**
 * Generic Table Component
 * - Strongly typed rows
 * - Custom cell renderers
 * - Graceful empty state
 * - No UI framework lock-in
 */
export default function Table<T>({
  columns,
  data,
  emptyMessage = 'No data available',
  rowKey,
}: TableProps<T>) {
  return (
    <div
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
        overflowX: 'auto',
        backgroundColor: '#ffffff',
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                style={{
                  textAlign: 'left',
                  padding: '0.75rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#475569',
                  borderBottom: '1px solid #e2e8f0',
                  width: col.width,
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: '1rem',
                  textAlign: 'center',
                  color: '#64748b',
                }}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={rowKey ? rowKey(row, idx) : idx}
                style={{
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    style={{
                      padding: '0.75rem',
                      fontSize: '0.85rem',
                      color: '#0f172a',
                    }}
                  >
                    {col.render
                      ? col.render(row)
                      : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
