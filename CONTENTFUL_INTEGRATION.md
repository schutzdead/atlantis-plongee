# Guide d'Intégration Contentful

## Structure créée

### ✅ Fichiers JSON de contenu
Tous les fichiers JSON ont été créés dans `/lib/` :
- `atlantis-content.json` - Page d'accueil (déjà intégré)
- `formations-content.json` - Page formations
- `discovery-content.json` - Page découverte
- `pricing-content.json` - Page tarifs
- `sites-content.json` - Page sites de plongée
- `team-content.json` - Page équipe
- `contact-content.json` - Page contact

### ✅ Pages Next.js créées
Routes créées avec App Router :
- `/` - Homepage (complète avec composants)
- `/formations` - Page formations
- `/decouverte` - Page découverte
- `/prix` - Page tarifs
- `/sites` - Page sites de plongée
- `/equipe` - Page équipe
- `/contact` - Page contact

### ✅ API Contentful configurée
Fonction `getPageContent(pageSlug)` ajoutée dans `lib/api.ts` pour récupérer le contenu de n'importe quelle page.

## Comment intégrer dans Contentful

### 1. Créer les Content Types dans Contentful

Pour chaque page, créez un **Content Type "Pages"** avec :
- **Field 1** : `slug` (Short text) - Identifiant unique de la page
- **Field 2** : `content` (JSON object) - Contenu complet de la page

### 2. Ajouter les entrées

Pour chaque page, créez une entrée avec :

#### Homepage
```
slug: "homepage"
content: [Coller le contenu de lib/atlantis-content.json]
```

#### Formations
```
slug: "formations"
content: [Coller le contenu de lib/formations-content.json]
```

#### Découverte
```
slug: "decouverte"
content: [Coller le contenu de lib/discovery-content.json]
```

#### Tarifs
```
slug: "prix"
content: [Coller le contenu de lib/pricing-content.json]
```

#### Sites
```
slug: "sites"
content: [Coller le contenu de lib/sites-content.json]
```

#### Équipe
```
slug: "equipe"
content: [Coller le contenu de lib/team-content.json]
```

#### Contact
```
slug: "contact"
content: [Coller le contenu de lib/contact-content.json]
```

### 3. GraphQL Query Structure

L'API utilise cette query pour récupérer les pages :

```graphql
query {
  pagesCollection(where: { slug: "formations" }, limit: 1) {
    items {
      sys {
        id
      }
      content
    }
  }
}
```

### 4. Développement des composants

Les pages actuelles sont des squelettes de base. Pour les compléter :

1. **Regardez les composants existants** dans `/app/components/home/` :
   - `HeroSection.tsx`
   - `FiveStarSection.tsx`
   - `QuickLinksSection.tsx`
   - `TestimonialsSection.tsx`
   - `StatsSection.tsx`
   - `CTASection.tsx`

2. **Créez des composants similaires** pour chaque page dans :
   - `/app/components/formations/` - Cartes de formation, filtres
   - `/app/components/discovery/` - Cartes de baptême, tabs
   - `/app/components/pricing/` - Tables de prix, FAQ
   - `/app/components/sites/` - Cartes de sites, filtres
   - `/app/components/team/` - Cartes de membres, valeurs
   - `/app/components/contact/` - Formulaire, carte

3. **Importez et utilisez** ces composants dans les pages

### 5. Pattern d'utilisation

Exemple pour enrichir la page Formations :

```tsx
// app/formations/page.tsx
import { getPageContent } from "@/lib/api";
import { FormationCard } from "@/app/components/formations/FormationCard";
import { FormationFilters } from "@/app/components/formations/FormationFilters";

export default async function FormationsPage() {
  const content = await getPageContent("formations");

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <HeroSection content={content.hero} />

      {/* Formations List */}
      <section className="py-16">
        <FormationFilters />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.formations.ecoleFrancaise.map((formation) => (
            <FormationCard key={formation.id} formation={formation} />
          ))}
        </div>
      </section>
    </div>
  );
}
```

## Prochaines étapes

### Priorité 1 - Composants essentiels
1. **FormationCard** - Carte d'affichage de formation
2. **ContactForm** - Formulaire de contact fonctionnel
3. **SiteCard** - Carte de site de plongée
4. **PricingTable** - Table des tarifs

### Priorité 2 - Fonctionnalités
1. Système de filtres pour formations et sites
2. Système de tabs pour découverte (baptêmes/initiations)
3. FAQ accordéon pour la page tarifs
4. Galerie d'images pour les sites

### Priorité 3 - Optimisations
1. SEO metadata pour toutes les pages
2. Images optimisées avec Next.js Image
3. Loading states et suspense boundaries
4. Error boundaries pour la gestion d'erreurs

## Notes importantes

- **Header/Footer** : Déjà intégrés dans le layout, présents sur toutes les pages
- **Erreur d'hydratation** : Corrigée dans HeroSection avec `isClient` state
- **TypeScript** : Types à définir pour chaque type de contenu
- **Contentful** : Utilise le même pattern que la homepage
- **Routing** : App Router Next.js 13+ avec Server Components

## Structure des données

Chaque fichier JSON suit cette structure :
```json
{
  "hero": { /* Section hero de la page */ },
  "mainContent": { /* Contenu principal spécifique à la page */ },
  "seo": { /* Métadonnées SEO */ }
}
```

Adaptez les composants pour consommer cette structure de données.
