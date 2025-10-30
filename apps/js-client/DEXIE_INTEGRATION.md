# Dexie.js Integration Documentation

## Overview

The VAPR Ballistics JS Client has been fully integrated with **Dexie.js** for local data persistence using IndexedDB. This enables users to save profiles, maintain calculation history, create reusable presets, and manage their data entirely offline.

## Features Implemented

### 1. **Calculation Profiles**
- Save complete calculation configurations with custom names and descriptions
- Load previously saved profiles instantly
- Mark profiles as favorites for quick access
- Search profiles by name, description, or tags
- Delete unwanted profiles

### 2. **Calculation History**
- Automatically save calculation results (configurable)
- View past calculations with full input/output data
- Search history by name or notes
- Export individual history entries to CSV
- Load previous calculations back into the calculator
- Clear old entries or entire history

### 3. **Preset Libraries**

#### Weapon Presets
- Save weapon configurations (sight height, barrel twist)
- Include manufacturer, model, and caliber information
- Tag and favorite weapons
- Quick-load weapon configurations

#### Ammo Presets
- Save ammunition data (BC, drag model, muzzle velocity, bullet weight)
- Include manufacturer, model, and caliber
- Tag and favorite ammunition
- Quick-load ammo configurations

#### Atmosphere Presets
- Pre-configured atmospheric conditions (4 defaults included)
- Save custom weather conditions
- Quick-load atmospheric data
- Perfect for different shooting locations or seasons

### 4. **User Preferences**
- Theme preference (light/dark/system)
- Auto-save history toggle
- Default calculation parameters
- CSV export preferences
- All preferences persist across sessions

### 5. **Data Management**
- **Export**: Download all data as JSON backup
- **Import**: Restore from backup (replace or merge)
- **Clear**: Reset all data (with confirmation)
- **Statistics**: View database usage stats

## Architecture

### Database Schema

```
BallisticsCalculator Database (v1)
├── profiles              # Saved calculation configurations
├── history               # Calculation results history
├── weaponPresets         # Weapon configuration library
├── ammoPresets           # Ammunition configuration library
├── atmospherePresets     # Atmospheric conditions library
└── preferences           # User preferences and settings
```

### File Structure

```
src/
├── lib/
│   └── db/
│       ├── schema.ts         # TypeScript interfaces for all tables
│       ├── database.ts       # Dexie database class and initialization
│       ├── services.ts       # CRUD service layer for all tables
│       ├── migrations.ts     # Database migration utilities
│       └── index.ts          # Public API exports
├── hooks/
│   └── useDatabase.ts        # React hooks for database operations
└── components/
    ├── DatabaseProvider.tsx  # Context provider with error handling
    ├── ProfileManager.tsx    # Profile save/load UI
    ├── HistoryViewer.tsx     # History viewing and loading UI
    ├── PresetLibrary.tsx     # Weapon/Ammo/Atmosphere preset UI
    └── DataManager.tsx       # Export/Import/Clear UI
```

## Usage Guide

### For Users

#### Saving a Profile
1. Configure your calculation parameters
2. Click "Save Profile" in the toolbar
3. Enter a name and optional description
4. Click "Save Profile"

#### Loading a Profile
1. Click "Load Profile" in the toolbar
2. Browse or search for your profile
3. Click on a profile to load it

#### Viewing History
1. Click "History" in the toolbar
2. Browse recent calculations
3. Click on an entry to view details
4. Click "Load" to restore that calculation

#### Managing Presets
1. Click "Presets" in the toolbar
2. Choose Weapons, Ammunition, or Atmosphere tab
3. Click "Add" to create new presets
4. Click on a preset to load it
5. Use star icon to mark favorites

#### Backing Up Data
1. Click "Data" in the toolbar
2. Click "Export All Data to JSON"
3. Save the file securely
4. To restore: Click "Replace All" or "Merge" and select your backup file

### For Developers

#### Using the Database Services

```typescript
import { profileService, historyService, weaponPresetService } from "@/lib/db";

// Create a profile
const profileId = await profileService.create({
  name: "My Profile",
  request: calculationData,
});

// Get all profiles
const profiles = await profileService.getAll();

// Search profiles
const results = await profileService.search("6.5 Creedmoor");

// Delete a profile
await profileService.delete(profileId);
```

#### Using React Hooks

```typescript
import { useProfiles, useHistory, useWeaponPresets } from "@/hooks/useDatabase";

function MyComponent() {
  const { profiles, create, remove } = useProfiles();
  const { history, add: addHistory } = useHistory();
  const { presets: weapons, favorites } = useWeaponPresets();

  // profiles, history, and weapons are live-updating arrays
  // create, remove, add, etc. are async functions
}
```

#### Database Initialization

The database is automatically initialized when the app loads via the `DatabaseProvider` component in `layout.tsx`. It:
1. Checks for IndexedDB support
2. Creates the database and tables
3. Adds default atmospheric presets
4. Creates default user preferences

#### Error Handling

The app gracefully handles browsers without IndexedDB support:
- Shows a warning banner
- Calculator continues to work normally
- Database features are hidden

## Default Data

### Atmospheric Presets
Four default atmospheric conditions are created on first run:
1. **Standard (ICAO)** - Sea level standard atmosphere
2. **Hot Summer Day** - 95°F, high humidity
3. **Cold Winter Day** - 32°F, moderate humidity
4. **High Altitude (5000ft)** - Mountain conditions

### User Preferences
Default preferences are created:
- Auto-save history: Enabled
- Theme: System
- Chart type: Combined
- CSV delimiter: Comma
- Decimal separator: Period
- Zero distance: 100 yards
- Max range: 1000 yards
- Step size: 100 yards

## Performance Considerations

- **Live Queries**: Uses Dexie React Hooks for reactive updates
- **Indexed Searches**: Fast lookups via indexed fields
- **Optimized Storage**: Only essential data is persisted
- **Lazy Loading**: History limited to last 50 entries by default
- **Batch Operations**: Bulk imports use transactions

## Browser Compatibility

Dexie.js and IndexedDB are supported in:
- ✅ Chrome/Edge 24+
- ✅ Firefox 16+
- ✅ Safari 10.1+
- ✅ iOS Safari 10.3+
- ✅ Android Browser 4.4+

The app detects unsupported browsers and shows a warning while maintaining core functionality.

## Data Privacy

- **All data is stored locally** in the browser's IndexedDB
- **No data is sent to any server**
- **No telemetry or analytics**
- **Users have full control** via export/import/clear features
- **Data persists** until manually cleared or browser storage is cleared

## Future Enhancements

Potential additions for future versions:
- Tagging system for profiles and presets
- Bulk operations (delete multiple, export selected)
- Profile templates and sharing (via JSON export)
- Advanced search filters
- Data sync across devices (optional cloud backup)
- Profile comparison tools
- Preset ratings and notes

## Migration Path

The database includes a migration system (`migrations.ts`) for future schema updates. When a new version is released:
1. Update the version number in `database.ts`
2. Add migration logic in `migrations.ts`
3. Run migrations automatically on app load
4. Preserve existing user data

## Troubleshooting

### Database Not Initializing
- Check browser console for errors
- Verify IndexedDB is not disabled in browser settings
- Try clearing browser cache/storage
- Check if in Private/Incognito mode (may have limitations)

### Data Not Persisting
- Ensure auto-save history is enabled (check Data Manager)
- Verify sufficient storage quota
- Check browser storage settings
- Try export/import to backup and restore

### Performance Issues
- Clear old history entries (Data Manager)
- Export and reimport data to compact database
- Limit search results
- Check browser memory/storage

## API Reference

See the TypeScript definitions in `src/lib/db/schema.ts` for complete API documentation. All services follow consistent patterns:
- `getAll()` - Retrieve all records
- `getById(id)` - Get single record
- `create(data)` - Create new record
- `update(id, data)` - Update existing record
- `delete(id)` - Delete record
- `search(query)` - Search records

## Contributing

When adding new features:
1. Update schema in `schema.ts`
2. Update database version and stores in `database.ts`
3. Add services in `services.ts`
4. Create React hooks in `useDatabase.ts`
5. Build UI components
6. Add migration logic if needed
7. Update this documentation

## License

This integration follows the same MIT license as the main project.
