function removeImgTagsFromDoc (doc: Document): Document {
  const imgElement = doc.documentElement.querySelector('img');

  if (imgElement !== null) {
    imgElement.parentNode?.removeChild(imgElement);
  }

  return doc;
}

function captureImgSrc
(htmlString: string): { srcImageValue: string | null, newBodyRemovedImgTag: string | undefined } {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const imgElement = doc.querySelector('img');

  let srcValue: string | null = null;
  const bodyRemovedImage = removeImgTagsFromDoc(doc).querySelector('body')?.innerHTML;

  if (imgElement !== null) {
    srcValue = imgElement.getAttribute('src');
  }

  return {
    srcImageValue: srcValue,
    newBodyRemovedImgTag: bodyRemovedImage
  };
}

function countTopicsAndTotal (
  threads: Array<{ category: string }>
): Array<{ topic: string, totalPost: number }> {
  return Object.entries(threads.reduce((acc: Record<string, number>, { category }) => {
    acc[category] = (acc[category] ?? 0) + 1;
    return acc;
  }, {})).map(([topic, count]) => ({ topic, totalPost: count }));
}

function convertDateFormat (dateString: string, formatType: number = 0): string {
  const date = new Date(dateString);

  if (formatType === 0) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const yearsAgo = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

    if (diff < 60000) {
      return 'Just now';
    }

    if (yearsAgo === 0) {
      const monthsAgo = Math.round(diff / (1000 * 60 * 60 * 24 * 30));
      if (monthsAgo === 0) {
        const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (daysAgo === 0) {
          const hoursAgo = Math.floor(diff / (1000 * 60 * 60));
          if (hoursAgo === 0) {
            const minutesAgo = Math.floor(diff / (1000 * 60));
            if (minutesAgo === 0) {
              return 'Just now';
            }
            return `${minutesAgo} minutes ago`;
          }
          return `${hoursAgo} hours ago`;
        }

        if (daysAgo === 1) {
          return 'Yesterday';
        }

        if (daysAgo < 7) {
          return `${daysAgo} days ago`;
        }
      } else {
        return `${monthsAgo} months ago`;
      }
    }

    return `${yearsAgo} years ago`;
  }

  const day = date.getDate();
  const month = date.toLocaleString('en-us', { month: 'short' });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}.${minutes} • ${day} ${month} ${year}`;
}

function getDefaultBrowserTheme (): string {
  if ((typeof window !== 'undefined') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export {
  convertDateFormat,
  captureImgSrc,
  countTopicsAndTotal,
  getDefaultBrowserTheme
};