// Função para criar o ícone e permitir o download
function createDownloadableIcon(size) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Desenhar fundo do ícone com gradiente
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#00C8FF');
    gradient.addColorStop(1, '#6A11CB');
    
    // Desenhar fundo arredondado
    ctx.beginPath();
    const radius = size * 0.22; // 22% de arredondamento
    ctx.moveTo(size - radius, 0);
    ctx.arcTo(size, 0, size, radius, radius);
    ctx.arcTo(size, size, size - radius, size, radius);
    ctx.arcTo(0, size, 0, size - radius, radius);
    ctx.arcTo(0, 0, radius, 0, radius);
    ctx.closePath();
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Desenhar fundo interno mais escuro
    const innerSize = size * 0.85;
    const innerOffset = (size - innerSize) / 2;
    
    ctx.beginPath();
    const innerRadius = innerSize * 0.22;
    ctx.moveTo(innerOffset + innerSize - innerRadius, innerOffset);
    ctx.arcTo(innerOffset + innerSize, innerOffset, innerOffset + innerSize, innerOffset + innerRadius, innerRadius);
    ctx.arcTo(innerOffset + innerSize, innerOffset + innerSize, innerOffset + innerSize - innerRadius, innerOffset + innerSize, innerRadius);
    ctx.arcTo(innerOffset, innerOffset + innerSize, innerOffset, innerOffset + innerSize - innerRadius, innerRadius);
    ctx.arcTo(innerOffset, innerOffset, innerOffset + innerRadius, innerOffset, innerRadius);
    ctx.closePath();
    
    ctx.fillStyle = '#0D1117';
    ctx.fill();
    
    // Desenhar a gota d'água (usando círculo azul claro)
    const dropSize = size * 0.25;
    ctx.beginPath();
    ctx.arc(size * 0.5, size * 0.35, dropSize, 0, Math.PI * 2);
    ctx.fillStyle = '#00C8FF';
    ctx.fill();
    
    // Adicionar brilho à gota
    const dropGradient = ctx.createRadialGradient(
        size * 0.45, size * 0.3, 0,
        size * 0.45, size * 0.3, dropSize
    );
    dropGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    dropGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.beginPath();
    ctx.arc(size * 0.45, size * 0.3, dropSize * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = dropGradient;
    ctx.fill();
    
    // Desenhar o rim (forma oval vermelha)
    ctx.beginPath();
    ctx.ellipse(size * 0.7, size * 0.7, size * 0.15, size * 0.1, Math.PI / 4, 0, Math.PI * 2);
    ctx.fillStyle = '#FF5252';
    ctx.fill();
    
    // Adicionar detalhe ao rim
    ctx.beginPath();
    ctx.ellipse(size * 0.7, size * 0.7, size * 0.1, size * 0.07, Math.PI / 4, 0, Math.PI * 2);
    ctx.fillStyle = '#E53935';
    ctx.fill();
    
    // Desenhar o símbolo de dinheiro
    ctx.font = `bold ${size * 0.2}px Arial`;
    ctx.fillStyle = '#00FFA3';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$', size * 0.3, size * 0.75);
    
    // Desenhar o símbolo de "menor que" entre a água e o rim
    ctx.font = `bold ${size * 0.15}px Arial`;
    ctx.fillStyle = 'white';
    ctx.fillText('<', size * 0.5, size * 0.55);
    
    // Converter para URL de dados
    return canvas.toDataURL('image/png');
}

// Função para criar link de download
function createDownloadLink(size) {
    const dataUrl = createDownloadableIcon(size);
    
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `icon-${size}x${size}.png`;
    link.className = 'download-btn';
    link.textContent = `Baixar ícone ${size}x${size}`;
    
    return link;
}

// Executar quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar os botões de download
    const buttonsContainer = document.getElementById('download-buttons');
    if (buttonsContainer) {
        buttonsContainer.appendChild(createDownloadLink(192));
        buttonsContainer.appendChild(document.createTextNode(' '));
        buttonsContainer.appendChild(createDownloadLink(512));
    }
    
    // Mostrar visualizações dos ícones
    const previewSmall = document.getElementById('preview-small');
    const previewLarge = document.getElementById('preview-large');
    
    if (previewSmall) {
        previewSmall.src = createDownloadableIcon(192);
    }
    
    if (previewLarge) {
        previewLarge.src = createDownloadableIcon(512);
    }
}); 