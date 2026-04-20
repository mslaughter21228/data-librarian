with open('/home/mslaughter-admin/projects/data-librarian-main/app/config/page.tsx', 'r') as f:
    content = f.read()

old = '''                                    <input type="text" value={logNamePrefix} onChange={e => setLogNamePrefix(e.target.value {/* SEGMENTING SECTION */}'''

new = '''                                    <input type="text" value={logNamePrefix} onChange={e => setLogNamePrefix(e.target.value)} className="w-full bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-3 py-2 text-sm font-mono focus:border-[var(--accent-primary)] outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-[var(--text-main)] font-mono">Excluded Folders (comma separated)</label>
                                    <input type="text" value={excludedFolders} onChange={e => setExcludedFolders(e.target.value)} className="w-full bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-3 py-2 text-sm font-mono focus:border-[var(--accent-primary)] outline-none" />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-xs text-[var(--text-main)] font-mono">Excluded Files (comma separated)</label>
                                    <input type="text" value={userExcludedFiles} onChange={e => setUserExcludedFiles(e.target.value)} placeholder="file1.txt, file2.pdf" className="w-full bg-[var(--bg-dark)] border border-[var(--border-dim)] text-[var(--text-main)] px-3 py-2 text-sm font-mono focus:border-[var(--accent-primary)] outline-none" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SEGMENTING SECTION */}'''

with open('/home/mslaughter-admin/projects/data-librarian-main/app/config/page.tsx', 'w') as f:
    f.write(content.replace(old, new, 1))

print('Done!')
