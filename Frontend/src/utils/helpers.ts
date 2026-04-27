export function joinClassNames(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

export function formatUnreadCount(count: number): string {
  return count > 9 ? '9+' : `${count}`
}

export function getInitials(label: string): string {
  return label
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
