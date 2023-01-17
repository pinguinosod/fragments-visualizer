import React from 'react';

function MetaDataTable({ attributes }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Trait Type</th>
          <th>Value</th>
          <th>Max Value</th>
        </tr>
      </thead>
      <tbody>
        {attributes.map((attribute) => (
          <tr key={attribute.trait_type}>
            <td>{attribute.trait_type}</td>
            <td>{attribute.value}</td>
            <td>{attribute.max_value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MetaDataTable;
